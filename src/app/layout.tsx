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

// Lấy URL gốc an toàn: env có thể rỗng/sai định dạng (vd thiếu https://) trên server,
// new URL(...) sẽ ném "Invalid URL" và làm sập build → kiểm tra trước, sai thì dùng mặc định.
function getSiteUrl(): URL {
  const fallback = "https://phonghailangnghe.com";
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  try {
    return new URL(raw && raw.length > 0 ? raw : fallback);
  } catch {
    return new URL(fallback);
  }
}

const SITE_NAME = "MTTQ xã Phong Hải";
const SITE_DESC =
  "Trang thông tin – tuyên truyền của Ủy ban MTTQ Việt Nam xã Phong Hải, tỉnh Lào Cai: tin tức, chuyển đổi số, dịch vụ công, gương người tốt việc tốt và tiếp nhận phản ánh của nhân dân.";

// Ảnh chia sẻ mặc định lấy từ src/app/opengraph-image.png (Next tự gắn og:image).
// Trang bài viết ghi đè bằng ảnh bìa của bài.
export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  keywords: [
    "MTTQ xã Phong Hải",
    "Mặt trận Tổ quốc Phong Hải",
    "xã Phong Hải",
    "Lào Cai",
    "tuyên truyền",
    "dịch vụ công trực tuyến",
    "chuyển đổi số",
  ],
  authors: [{ name: "Ủy ban MTTQ Việt Nam xã Phong Hải" }],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "vi_VN",
    alternateLocale: ["en_US"],
    url: "/",
    title: SITE_NAME,
    description: SITE_DESC,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESC,
  },
  alternates: {
    canonical: "/",
    languages: { vi: "/", en: "/en" },
  },
  robots: { index: true, follow: true },
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
