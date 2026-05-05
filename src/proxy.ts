import NextAuth from "next-auth";
import { authConfig } from "../auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isAuthPage =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/signup");

  if (!req.auth && !isAuthPage) {
    return Response.redirect(new URL("/login", req.nextUrl.origin));
  }

  if (req.auth && isAuthPage) {
    return Response.redirect(new URL("/", req.nextUrl.origin));
  }
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|icon-192.png|icon-512.png|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
