// client/src/app/api/auth/user/route.ts

import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "change-this-in-prod";

export function GET(request: NextRequest) {
  // Grab the token cookie
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ user: null });
  }

  try {
    // Verify the JWT
    const data = jwt.verify(token, SECRET) as { username: string };
    return NextResponse.json({ user: { username: data.username } });
  } catch {
    return NextResponse.json({ user: null });
  }
}
