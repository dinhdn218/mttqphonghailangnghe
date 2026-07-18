import { getLocale } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingActions } from "@/components/floating-actions";
import {
  getSettings,
  siteNameFor,
  siteDescriptionFor,
} from "@/lib/settings";
import { getSiteUrlString } from "@/lib/site-url";

const SITE_URL = getSiteUrlString();

// Layout cho các trang công khai (trang chủ, chuyên mục, bài viết).
// Khu vực /admin và /dang-nhap KHÔNG dùng layout này.
export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const settings = await getSettings();
  const { contact, activePlatforms } = settings;

  // Dữ liệu có cấu trúc: khai báo đây là cơ quan nhà nước để Google hiểu đúng
  // (tên, logo, đường dây nóng, địa chỉ, các kênh mạng xã hội chính thức).
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: siteNameFor(settings, locale),
    alternateName:
      locale === "en" ? settings.siteName : settings.siteNameEn || undefined,
    description: siteDescriptionFor(settings, locale),
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    image: `${SITE_URL}/opengraph-image.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
      addressRegion: "Lào Cai",
      addressCountry: "VN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: contact.hotline,
      email: contact.email,
      availableLanguage: ["Vietnamese", "English"],
    },
    ...(activePlatforms.length > 0
      ? { sameAs: activePlatforms.map((p) => p.url) }
      : {}),
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <script
        type="application/ld+json"
        // Dữ liệu do mình sinh (không phải input người dùng) nên an toàn.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
      <FloatingActions
        hotline={contact.hotline}
        platforms={activePlatforms.map((p) => ({
          key: p.key,
          label: p.label,
          url: p.url,
        }))}
      />
    </div>
  );
}
