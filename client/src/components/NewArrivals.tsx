// client/src/components/NewArrivals.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Classic Knit Sweater",
    price: "$49.99",
    image: "/images/products/product-1.png",
    href: "/products/1",
  },
  {
    id: 2,
    name: "Everyday T-Shirt",
    price: "$19.99",
    image: "/images/products/product-2.png",
    href: "/products/2",
  },
  {
    id: 3,
    name: "Slim-Fit Chinos",
    price: "$39.99",
    image: "/images/products/product-3.png",
    href: "/products/3",
  },
  {
    id: 4,
    name: "Lightweight Jacket",
    price: "$59.99",
    image: "/images/products/product-4.png",
    href: "/products/4",
  },
];

export default function NewArrivals() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-light mb-8 text-center">New Arrivals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group flex flex-col border rounded-lg overflow-hidden"
          >
            <div className="overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="object-cover w-full h-64 group-hover:scale-105 transition-transform"
                priority
              />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-lg font-medium mb-2">{product.name}</h3>
              <p className="text-gray-700 mb-4">{product.price}</p>
              <Link
                href={product.href}
                className="mt-auto bg-black text-white py-2 text-center hover:bg-gray-800 transition"
              >
                Add to Cart
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
