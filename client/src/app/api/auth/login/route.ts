// client/src/app/api/auth/login/route.ts

import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "change-this-in-prod";

export async function POST(request: NextRequest) {
  const { username, password, remember } = await request.json();

  // Accept either the demo user _or_ an admin
  if (
    (username === "user"  && password === "pass") ||
    (username === "admin" && password === "pass")
  ) {
    const isAdmin = username === "admin";
    const token = jwt.sign(
      { username, isAdmin },
      SECRET,
      { expiresIn: remember ? "7d" : "1h" }
    );

    const res = NextResponse.json({ success: true });
    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: remember ? 7 * 24 * 60 * 60 : 60 * 60,
    });
    return res;
  }

  return NextResponse.json(
    { error: "Invalid credentials" },
    { status: 401 }
  );
}
