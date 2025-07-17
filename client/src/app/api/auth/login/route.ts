// client/src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";       // ← corrected here

const SECRET = process.env.JWT_SECRET || "change-this-in-prod";

export async function POST(req: Request) {
  const { username, password, remember } = await req.json();

  // — Demo user check — replace with your real logic —
  if (username === "user" && password === "pass") {
    const token = jwt.sign({ username }, SECRET, {
      expiresIn: remember ? "7d" : "1h",
    });

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
