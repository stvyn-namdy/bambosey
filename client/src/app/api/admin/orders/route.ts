// client/src/app/api/admin/orders/route.ts
import { NextResponse, NextRequest } from "next/server";
import { mockOrders } from "../../../../data/orders";

export async function GET(request: NextRequest) {
  // TODO: verify admin via request.cookies
  return NextResponse.json(mockOrders);
}
