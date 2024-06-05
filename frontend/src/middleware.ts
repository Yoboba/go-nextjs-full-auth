import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookie } from "@/lib/cookies";
import { isRoute, routes } from "@/constants/routes";

export function middleware(request: NextRequest) {
  const jwt = getCookie("jwt");
  console.log(request.nextUrl.pathname);
  if (request.nextUrl.pathname === routes.SIGN_IN) {
    if (jwt !== undefined) {
      console.log("can't sign-in if already signed in");
      return NextResponse.redirect(new URL(routes.ROOT, request.url));
    } else {
      return NextResponse.next();
    }
  }
  if (!isRoute(request.nextUrl.pathname)) {
    if (jwt === undefined) {
      console.log("please sign-in or register to access your account");
      return NextResponse.redirect(new URL(routes.ROOT, request.url));
    } else {
      return NextResponse.next();
    }
  }
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
