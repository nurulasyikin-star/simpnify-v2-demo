import { NextResponse, type NextRequest } from "next/server";

import { isPublicPath } from "@/config/site-visibility";

export function middleware(request: NextRequest) {
  if (!isPublicPath(request.nextUrl.pathname)) {
    return new NextResponse(null, { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/partners", "/demo/:path*"],
};
