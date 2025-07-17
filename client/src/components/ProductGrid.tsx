// client/src/components/ProductGrid.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "../data/products";

interface Props {
  products: Product[];
}

export default function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return <p className="text-center py-8 text-white">No products found.</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        <div
          key={p.id}
          className="group flex flex-col border rounded-lg overflow-hidden bg-white"
        >
          <div className="overflow-hidden">
            <Image
              src={p.image}
              alt={p.name}
              width={400}
              height={400}
              className="object-cover w-full h-64 group-hover:scale-105 transition-transform"
              priority
            />
          </div>
          <div className="p-4 flex-1 flex flex-col text-gray-900">
            <h3 className="text-lg font-medium mb-1">{p.name}</h3>
            <p className="text-gray-700 mb-4">{p.price}</p>
            <Link
              href={`/products/${p.id}`}
              className="mt-auto bg-black text-white py-2 text-center hover:bg-gray-800 transition"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
