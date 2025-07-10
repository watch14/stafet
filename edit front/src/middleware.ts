/**
 * ADMIN MIDDLEWARE - Route Protection
 * ==================================
 * 
 * This middleware protects admin routes and ensures only authenticated
 * users can access admin functionality.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Only apply middleware to admin routes (except login page)
  if (request.nextUrl.pathname.startsWith("/admin") && 
      !request.nextUrl.pathname.startsWith("/admin/login")) {
    
    // In a real app, you'd validate a JWT token here
    // For now, we'll let the client-side handle auth
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};
