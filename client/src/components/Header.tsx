// client/src/components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { usePathname } from "next/navigation";

export default function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname() || "";

  // Helper to check active link
  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Your Logo"
            width={120}
            height={40}
            priority
          />
        </Link>

        {/* Main nav */}
        <nav className="hidden md:flex space-x-8 text-sm font-light text-gray-700">
          <Link
            href="/women"
            className={`
              hover:text-black
              ${isActive("/women") ? "font-bold text-gray-900" : ""}
            `}
          >
            Women
          </Link>
          <Link
            href="/men"
            className={`
              hover:text-black
              ${isActive("/men") ? "font-bold text-gray-900" : ""}
            `}
          >
            Men
          </Link>
          <Link
            href="/kids"
            className={`
              hover:text-black
              ${isActive("/kids") ? "font-bold text-gray-900" : ""}
            `}
          >
            Kids
          </Link>
          <Link
            href="/lifewear"
            className={`
              hover:text-black
              ${isActive("/lifewear") ? "font-bold text-gray-900" : ""}
            `}
          >
            LifeWear
          </Link>
        </nav>

        {/* Utility: user greeting or login + icons */}
        <div className="flex items-center space-x-4 text-gray-700">
          {user ? (
            <>
              <span className="text-sm">Hi, {user.username}</span>
              <button
                onClick={() => logout()}
                className="text-sm font-medium hover:text-black"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className={`text-sm font-medium hover:text-black ${
                pathname === "/login" ? "font-bold text-gray-900" : ""
              }`}
            >
              Log In
            </Link>
          )}

          {/* Search icon */}
          <Link href="/search" className="hover:text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 12.65z"
              />
            </svg>
          </Link>

          {/* Cart icon */}
          <Link href="/cart" className="hover:text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6m0 0H17m-10.8 0a1.2 1.2 0 102.4 0m8.4 0a1.2 1.2 0 102.4 0"
              />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
