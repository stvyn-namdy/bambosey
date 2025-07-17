// client/src/app/[category]/page.tsx
"use client";

import { useState, useMemo } from "react";
import { notFound } from "next/navigation";
import { products, Product } from "../../data/products";
import ProductGrid   from "../../components/ProductGrid";
import SearchBar     from "../../components/SearchBar";
import FilterDrawer  from "../../components/FilterDrawer";

interface Props {
  params: { category: string };
}

export default function CategoryPage({ params }: Props) {
  const category = params.category.toLowerCase();
  if (!["women", "men", "kids", "lifewear"].includes(category)) {
    return notFound();
  }

  // Base list
  const categoryProducts = useMemo(
    () => products.filter((p) => p.category === category),
    [category]
  );

  // Extract filter options
  const subcategories = Array.from(new Set(categoryProducts.map((p) => p.subcategory)));
  const colors        = Array.from(new Set(categoryProducts.flatMap((p) => p.colors)));
  const sizes         = Array.from(new Set(categoryProducts.flatMap((p) => p.sizes)));

  // Filter state
  const [search, setSearch]                 = useState("");
  const [priceRanges, setPriceRanges]       = useState<string[]>([]);
  const [selectedSubcategories, setSubcats] = useState<string[]>([]);
  const [selectedColors, setColors]         = useState<string[]>([]);
  const [selectedSizes, setSizes]           = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen]         = useState(false);

  const toggle = (v: string, setter: React.Dispatch<React.SetStateAction<string[]>>) =>
    setter((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));

  // Apply filters
  const filtered = categoryProducts
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => {
      if (!priceRanges.length) return true;
      return priceRanges.some((range) => {
        const price = p.priceNumber;
        if (range === "0-25")  return price <= 25;
        if (range === "25-50") return price > 25 && price <= 50;
        return price > 50;
      });
    })
    .filter((p) => !selectedSubcategories.length || selectedSubcategories.includes(p.subcategory))
    .filter((p) => !selectedColors.length        || p.colors.some((c) => selectedColors.includes(c)))
    .filter((p) => !selectedSizes.length         || p.sizes.some((s) => selectedSizes.includes(s)));

  // Prepare groups for the drawer
  const groups = [
    {
      title: "Price",
      items: [
        { key: "0-25",  label: "$0 – $25" },
        { key: "25-50", label: "$25 – $50" },
        { key: "50+",   label: "$50+" },
      ],
      selected: priceRanges,
      onChange: (v: string) => toggle(v, setPriceRanges),
    },
    {
      title: "Subcategories",
      items: subcategories.map((s) => ({ key: s, label: s })),
      selected: selectedSubcategories,
      onChange: (v: string) => toggle(v, setSubcats),
    },
    {
      title: "Color",
      items: colors.map((c) => ({ key: c, label: c })),
      selected: selectedColors,
      onChange: (v: string) => toggle(v, setColors),
    },
    {
      title: "Size",
      items: sizes.map((s) => ({ key: s, label: s.toUpperCase() })),
      selected: selectedSizes,
      onChange: (v: string) => toggle(v, setSizes),
    },
  ];

  return (
    <main className="px-4 py-12 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-light capitalize">{category}</h1>
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center space-x-2 text-sm font-medium text-gray-900 py-2 px-4 bg-white border rounded hover:bg-gray-50 hover:text-black"
        >
          <span>Filters</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 019 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
        </button>
      </div>

      {/* Search bar */}
      <SearchBar value={search} onChange={setSearch} />

      {/* Product grid */}
      <ProductGrid products={filtered} />

      {/* Filter drawer */}
      <FilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} groups={groups} />
    </main>
  );
}
