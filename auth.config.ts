import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isAuthenticated = !!auth?.user;
      const isAuthPage =
        request.nextUrl.pathname.startsWith("/login") ||
        request.nextUrl.pathname.startsWith("/signup");

      if (isAuthenticated && isAuthPage) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      if (!isAuthenticated && !isAuthPage) {
        return Response.redirect(new URL("/login", request.nextUrl));
      }

      return true;
    },
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub;
      return session;
    },
  },
  providers: [],
};
