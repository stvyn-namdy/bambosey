// client/src/app/cart/page.tsx
"use client";

import { useCart, CartItem } from "../../context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, updateQty, removeItem, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
        <p className="text-gray-700 mb-8">Your cart is empty.</p>
        <Link
          href="/"
          className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-16 space-y-8">
      <h1 className="text-3xl font-semibold text-gray-900">Your Cart</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                Qty
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
                Subtotal
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item: CartItem) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-4">
                  <div className="w-16 h-16 relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <span className="text-gray-900 font-medium">{item.name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-gray-700">
                  ${item.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQty(item.id, Math.max(1, Number(e.target.value)))
                    }
                    className="w-20 border border-gray-400 bg-gray-100 text-base text-gray-900 rounded px-3 py-1 text-center"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center space-x-6">
        <span className="text-xl font-medium text-gray-900">Total:</span>
        <span className="text-2xl font-semibold text-gray-900">
          ${total.toFixed(2)}
        </span>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => alert("Checkout flow coming soon!")}
          className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
