// client/src/data/products.ts

export interface Product {
  id: number;
  name: string;
  price: string;
  priceNumber: number;
  image: string;
  category: "women" | "men" | "kids" | "lifewear";
  subcategory: string;
  colors: string[];
  sizes: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Classic Knit Sweater",
    price: "$49.99",
    priceNumber: 49.99,
    image: "/images/products/product-1.png",
    category: "women",
    subcategory: "Tops",
    colors: ["Red", "Blue"],
    sizes: ["S", "M", "L"],
  },
  {
    id: 5,
    name: "Soft Silk Blouse",
    price: "$69.99",
    priceNumber: 69.99,
    image: "/images/products/product-5.png",
    category: "women",
    subcategory: "Tops",
    colors: ["White", "Pink"],
    sizes: ["S", "M"],
  },
  {
    id: 6,
    name: "Denim Midi Skirt",
    price: "$59.99",
    priceNumber: 59.99,
    image: "/images/products/product-6.png",
    category: "women",
    subcategory: "Bottoms",
    colors: ["Blue"],
    sizes: ["S", "M", "L"],
  },
  // …other products…
];
