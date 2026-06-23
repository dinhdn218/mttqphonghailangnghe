import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";
import { Providers } from "@/components/providers";

// Font hỗ trợ đầy đủ dấu tiếng Việt, hợp với người dùng vùng dân tộc thiểu số.
const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://phonghailangnghe.com",
  ),
  title: {
    default: "MTTQ xã Phong Hải",
    template: "%s | MTTQ xã Phong Hải",
  },
  description:
    "Trang thông tin – tuyên truyền của Ủy ban MTTQ Việt Nam xã Phong Hải, tỉnh Lào Cai.",
};

// Ưu tiên mobile (người dùng chủ yếu truy cập bằng điện thoại).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Locale do next-intl xác định từ URL (vi cho admin/đăng nhập, en cho /en…).
  // Trang công khai render động (hệ quả của localePrefix "as-needed" — URL vi không tiền tố).
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${beVietnamPro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
