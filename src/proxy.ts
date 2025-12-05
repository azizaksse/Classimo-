import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["fr", "ar"],

  // Used when no locale matches
  defaultLocale: "fr",
});

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/fr";
    return NextResponse.redirect(url);
  }

  if (pathname === "/admin") {
    const url = request.nextUrl.clone();
    url.pathname = "/fr/admin";
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all paths except for:
  // - api (API routes)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
