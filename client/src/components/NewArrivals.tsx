// client/src/components/NewArrivals.tsx
"use client";

import Image from "next/image";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";

export default function NewArrivals() {
  const { addItem } = useCart();

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-light mb-8 text-center">New Arrivals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-lg shadow overflow-hidden flex flex-col"
          >
            <Image
              src={p.image}
              alt={p.name}
              width={600}
              height={400}
              className="object-cover w-full h-64"
            />
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-lg font-medium mb-2">{p.name}</h3>
              <p className="text-gray-700 mb-4">{p.price}</p>
              <button
                onClick={() =>
                  addItem(
                    {
                      id: p.id.toString(),
                      name: p.name,
                      price: p.priceNumber,
                      image: p.image,
                    },
                    1
                  )
                }
                className="mt-auto bg-black text-white py-2 rounded hover:bg-gray-800 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
