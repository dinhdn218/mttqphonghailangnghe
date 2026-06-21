import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import NextAuth from "next-auth";
import { routing } from "@/i18n/routing";
import { authConfig } from "@/auth.config";

// Proxy (tên mới của middleware từ Next 16) chạy ở edge.
// - /admin: bảo vệ bằng phiên đăng nhập (chặn thẳng tại edge).
// - /dang-nhap: không localize, cho qua.
// - Còn lại (công khai): chạy next-intl để định tuyến locale (/en…).
const intlMiddleware = createMiddleware(routing);
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");
  if (isAdmin) {
    if (!req.auth) {
      const url = new URL("/dang-nhap", req.nextUrl.origin);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    return; // đã đăng nhập → cho qua (không localize)
  }

  const isLogin = pathname === "/dang-nhap" || pathname.startsWith("/dang-nhap/");
  if (isLogin) return; // không localize

  return intlMiddleware(req);
});

export const config = {
  // Bỏ qua api, _next, file tĩnh; còn lại đều qua proxy.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
