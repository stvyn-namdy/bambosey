// client/src/app/api/admin/users/route.ts

import { NextResponse, NextRequest } from "next/server";
import { mockUsers } from "../../../../data/users";

export async function GET(request: NextRequest) {
  // In a real app you'd check request.cookies.get("token") and verify isAdmin here
  return NextResponse.json(mockUsers);
}
