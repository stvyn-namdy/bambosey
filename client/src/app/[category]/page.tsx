// client/src/app/[category]/page.tsx

"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { products as allProducts, Product } from "../../data/products";
import SearchBar from "../../components/SearchBar";
import ProductGrid from "../../components/ProductGrid";

interface Params { params: { category: string } }

export default function CategoryPage({ params }: Params) {
  const category = params.category.toLowerCase();
  if (!["women","men","kids","lifewear"].includes(category)) return notFound();

  const categoryProducts = allProducts.filter((p) => p.category === category);
  const [search, setSearch] = useState("");
  const filtered = categoryProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="px-4 py-12 max-w-7xl mx-auto">
      <h1 className="text-3xl font-light mb-6 capitalize">{category}</h1>
      <SearchBar value={search} onChange={setSearch} />
      <div className="mt-8">
        <ProductGrid products={filtered} />
      </div>
    </main>
  );
}
