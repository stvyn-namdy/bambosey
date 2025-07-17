// client/src/components/Categories.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

const cats = [
  { title: "Women",    image: "/images/cat-women.png",    href: "/women"   },
  { title: "Men",      image: "/images/cat-men.png",      href: "/men"     },
  { title: "Kids",     image: "/images/cat-kids.png",     href: "/kids"    },
  { title: "LifeWear", image: "/images/cat-lifeware.png", href: "/lifewear" },
];

export default function Categories() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-light mb-8 text-center">
        Featured Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cats.map((cat) => (
          <Link
            key={cat.title}
            href={cat.href}
            className="group relative overflow-hidden rounded-lg p-1"
          >
            <div className="overflow-hidden rounded-md">
              <Image
                src={cat.image}
                alt={cat.title}
                width={600}
                height={400}
                className="object-cover w-full h-64 group-hover:scale-105 transition-transform"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
              <span className="text-white text-xl font-medium">
                {cat.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
