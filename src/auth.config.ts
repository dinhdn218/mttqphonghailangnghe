import type { NextAuthConfig } from "next-auth";
import type { Role } from "@/generated/prisma/client";

// Cấu hình Auth.js dùng được ở edge (middleware) — KHÔNG import Prisma/bcrypt ở đây.
// Provider credentials (cần Node) được thêm trong src/auth.ts.
export const authConfig = {
  pages: {
    signIn: "/dang-nhap",
  },
  // Phiên hết hạn sau 8 giờ (một ca làm việc) thay vì mặc định 30 ngày —
  // giảm rủi ro nếu cán bộ quên đăng xuất trên máy dùng chung.
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 giờ
    updateAge: 60 * 60, // gia hạn tối đa 1 lần/giờ khi còn hoạt động
  },
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
