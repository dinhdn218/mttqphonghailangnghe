import type { NextAuthConfig } from "next-auth";
import type { Role } from "@/generated/prisma/client";

// Cấu hình Auth.js dùng được ở edge (middleware) — KHÔNG import Prisma/bcrypt ở đây.
// Provider credentials (cần Node) được thêm trong src/auth.ts.
export const authConfig = {
  pages: {
    signIn: "/dang-nhap",
  },
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    // Chặn truy cập khu vực quản trị nếu chưa đăng nhập.
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      if (isOnAdmin) return isLoggedIn;
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
