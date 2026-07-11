import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";
import { Providers } from "@/components/providers";
import {
  getSettings,
  siteNameFor,
  siteDescriptionFor,
} from "@/lib/settings";

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

// Tên + mô tả site lấy từ CẤU HÌNH CMS (/admin/cau-hinh) — nguồn duy nhất, khách
// tự sửa được. Lỗi DB thì getSettings() tự lùi về giá trị mặc định trong mã.
// Ảnh chia sẻ mặc định lấy từ src/app/opengraph-image.png (Next tự gắn og:image);
// trang bài viết ghi đè bằng ảnh bìa của bài.
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const settings = await getSettings();
  const name = siteNameFor(settings, locale);
  const description = siteDescriptionFor(settings, locale);

  return {
    metadataBase: getSiteUrl(),
    title: {
      default: name,
      template: `%s | ${name}`,
    },
    description,
    applicationName: name,
    keywords: [
      "MTTQ xã Phong Hải",
      "Mặt trận Tổ quốc Phong Hải",
      "xã Phong Hải",
      "Lào Cai",
      "tuyên truyền",
      "dịch vụ công trực tuyến",
      "chuyển đổi số",
    ],
    authors: [{ name: settings.siteName }],
    openGraph: {
      type: "website",
      siteName: name,
      locale: locale === "en" ? "en_US" : "vi_VN",
      alternateLocale: locale === "en" ? ["vi_VN"] : ["en_US"],
      url: "/",
      title: name,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description,
    },
    alternates: {
      canonical: "/",
      languages: { vi: "/", en: "/en" },
    },
    robots: { index: true, follow: true },
  };
}

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
