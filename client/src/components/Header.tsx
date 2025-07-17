// client/src/components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = usePathname() || "";
  const isActive = (path: string) => pathname.startsWith(path);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo" width={120} height={40} priority />
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex space-x-8 text-sm font-light text-gray-700">
            {["women","men","kids","lifewear"].map((cat) => (
              <Link
                key={cat}
                href={`/${cat}`}
                className={`hover:text-black ${isActive("/"+cat) ? "font-bold text-gray-900" : ""}`}
              >
                {cat.charAt(0).toUpperCase()+cat.slice(1)}
              </Link>
            ))}
          </nav>

          {/* Utilities */}
          <div className="flex items-center space-x-4 text-gray-700">
            {user ? (
              <>
                <span className="text-sm">Hi, {user.username}</span>
                <button onClick={() => logout()} className="text-sm font-medium hover:text-black">
                  Log Out
                </button>
              </>
            ) : (
              <Link href="/login" className={`text-sm font-medium hover:text-black ${pathname==="/login"?"font-bold text-gray-900":""}`}>
                Log In
              </Link>
            )}

            {/* Search icon omitted for brevity */}

            {/* Cart icon */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-1 hover:text-black"
              aria-label="Open cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6m0 0H17m-10.8 0a1.2 1.2 0 102.4 0m8.4 0a1.2 1.2 0 102.4 0" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
