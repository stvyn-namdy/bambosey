const express = require('express');
const { body, validationResult } = require('express-validator');
const prisma = require('../lib/prisma');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Create preorder
router.post('/', [
  authenticateToken,
  body('productId').isInt(),
  body('productVariantId').optional().isInt(),
  body('quantity').isInt({ min: 1 }),
  body('shippingAddressId').optional().isInt(),
  body('depositAmount').optional().isFloat({ min: 0 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { 
      productId, 
      productVariantId, 
      quantity, 
      shippingAddressId,
      depositAmount
    } = req.body;

    // Get product and variant details
    const product = await prisma.product.findFirst({
      where: { 
        id: parseInt(productId),
        isActive: true,
        allowPreorder: true
      },
      include: {
        variants: productVariantId ? {
          where: { id: parseInt(productVariantId) }
        } : true
      }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found or preorder not allowed' });
    }

    // Check preorder limit
    if (product.preorderLimit) {
      const existingPreorders = await prisma.preorder.count({
        where: {
          productId: parseInt(productId),
          status: { in: ['PENDING', 'CONFIRMED'] }
        }
      });

      if (existingPreorders + quantity > product.preorderLimit) {
        return res.status(400).json({ error: 'Preorder limit exceeded' });
      }
    }

    const price = product.preorderPrice || product.basePrice;
    const totalAmount = price * quantity;
    const deposit = depositAmount || 0;
    const remaining = totalAmount - deposit;

    const preorder = await prisma.preorder.create({
      data: {
        userId: req.user.id,
        productId: parseInt(productId),
        productVariantId: productVariantId ? parseInt(productVariantId) : null,
        quantity,
        price,
        shippingAddressId: shippingAddressId || null,
        expectedDate: product.expectedStockDate,
        depositPaid: deposit,
        remainingAmount: remaining,
        status: deposit > 0 ? 'CONFIRMED' : 'PENDING'
      },
      include: {
        product: {
          select: { name: true }
        },
        productVariant: {
          include: {
            color: true,
            size: true
          }
        }
      }
    });

    res.status(201).json({ message: 'Preorder created successfully', preorder });
  } catch (error) {
    console.error('Error creating preorder:', error);
    res.status(500).json({ error: 'Failed to create preorder' });
  }
});

// Get user's preorders
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;
    const take = parseInt(limit);

    const where = {
      userId: req.user.id,
      ...(status && { status })
    };

    const [preorders, total] = await Promise.all([
      prisma.preorder.findMany({
        where,
        include: {
          product: {
            select: { 
              name: true, 
              images: true,
              expectedStockDate: true 
            }
          },
          productVariant: {
            include: {
              color: true,
              size: true
            }
          },
          shippingAddress: true
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take
      }),
      prisma.preorder.count({ where })
    ]);

    res.json({
      preorders,
      pagination: {
        total,
        page: parseInt(page),
        limit: take,
        pages: Math.ceil(total / take)
      }
    });
  } catch (error) {
    console.error('Error fetching preorders:', error);
    res.status(500).json({ error: 'Failed to fetch preorders' });
  }
});

// Get specific preorder
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const preorder = await prisma.preorder.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user.id
      },
      include: {
        product: true,
        productVariant: {
          include: {
            color: true,
            size: true
          }
        },
        shippingAddress: true
      }
    });

    if (!preorder) {
      return res.status(404).json({ error: 'Preorder not found' });
    }

    res.json(preorder);
  } catch (error) {
    console.error('Error fetching preorder:', error);
    res.status(500).json({ error: 'Failed to fetch preorder' });
  }
});

// Cancel preorder
router.put('/:id/cancel', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const preorder = await prisma.preorder.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user.id
      }
    });

    if (!preorder) {
      return res.status(404).json({ error: 'Preorder not found' });
    }

    if (!['PENDING', 'CONFIRMED'].includes(preorder.status)) {
      return res.status(400).json({ error: 'Preorder cannot be cancelled' });
    }

    const updatedPreorder = await prisma.preorder.update({
      where: { id: parseInt(id) },
      data: { status: 'CANCELLED' }
    });

    res.json({ message: 'Preorder cancelled successfully', preorder: updatedPreorder });
  } catch (error) {
    console.error('Error cancelling preorder:', error);
    res.status(500).json({ error: 'Failed to cancel preorder' });
  }
});

// Update preorder status (Admin only)
router.put('/:id/status', [
  authenticateToken,
  requireAdmin,
  body('status').isIn(['PENDING', 'CONFIRMED', 'READY', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'EXPIRED'])
], async (req, res) => {
  try {
    const { id } = req.params;
    const { status, trackingNumber } = req.body;

    const updateData = { 
      status,
      ...(trackingNumber && { trackingNumber })
    };

    const preorder = await prisma.preorder.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        user: {
          select: { email: true, firstName: true }
        },
        product: {
          select: { name: true }
        }
      }
    });

    // TODO: Send notification email to customer
    console.log(`Preorder ${id} status updated to ${status} for user ${preorder.user.email}`);

    res.json({ message: 'Preorder status updated successfully', preorder });
  } catch (error) {
    console.error('Error updating preorder status:', error);
    res.status(500).json({ error: 'Failed to update preorder status' });
  }
});

// Get all preorders (Admin only)
router.get('/admin/all', [authenticateToken, requireAdmin], async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const skip = (page - 1) * limit;
    const take = parseInt(limit);

    const where = {
      ...(status && { status }),
      ...(search && {
        OR: [
          { user: { email: { contains: search, mode: 'insensitive' } } },
          { product: { name: { contains: search, mode: 'insensitive' } } }
        ]
      })
    };

    const [preorders, total] = await Promise.all([
      prisma.preorder.findMany({
        where,
        include: {
          user: {
            select: { email: true, firstName: true, lastName: true }
          },
          product: {
            select: { name: true }
          },
          productVariant: {
            include: {
              color: true,
              size: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take
      }),
      prisma.preorder.count({ where })
    ]);

    res.json({
      preorders,
      pagination: {
        total,
        page: parseInt(page),
        limit: take,
        pages: Math.ceil(total / take)
      }
    });
  } catch (error) {
    console.error('Error fetching admin preorders:', error);
    res.status(500).json({ error: 'Failed to fetch preorders' });
  }
});

module.exports = router;