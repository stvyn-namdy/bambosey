// client/src/app/api/admin/analytics/route.ts
import { NextResponse, NextRequest } from "next/server";
import { mockAnalytics } from "../../../../data/analytics";

export async function GET(request: NextRequest) {
  // (In prod: verify admin via request.cookies)
  return NextResponse.json(mockAnalytics);
}
