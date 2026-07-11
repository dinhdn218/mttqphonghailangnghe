import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Header bảo mật cơ bản (mức cấp độ 1 — Nghị định 85/2016).
const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    // Tắt các quyền trình duyệt không dùng đến.
    // (KHÔNG chặn camera: widget upload Cloudinary có nguồn "camera".)
    key: "Permissions-Policy",
    value: "microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  // Ẩn header X-Powered-By: Next.js
  poweredByHeader: false,
  images: {
    // Cho phép next/image tối ưu ảnh tải từ Cloudinary.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        // Ảnh mẫu cho dữ liệu demo (thay bằng Cloudinary khi có nội dung thật)
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);
