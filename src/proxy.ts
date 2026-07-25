import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  // In frontend-only mock mode, bypass all authentication and route protection
  return NextResponse.next({ request });
}

export const config = {
  matcher: [
    /*
     * Run on everything except static assets and image optimization
     * files.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
