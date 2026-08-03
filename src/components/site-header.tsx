import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CATEGORIES, type Locale } from "@/lib/constants";
import { pick } from "@/lib/i18n";
import { getSettings, siteNameFor } from "@/lib/settings";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Emblem } from "@/components/emblem";
import { NavLinks } from "@/components/nav-links";

// Header phong cách cổng thông tin điện tử cơ quan nhà nước:
// dải tiện ích → banner thương hiệu (quốc huy + tên cơ quan) → thanh điều hướng đỏ.
export async function SiteHeader() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  // Tên cơ quan lấy từ Cấu hình CMS (nguồn duy nhất) — khách tự sửa được.
  const settings = await getSettings();
  const { contact } = settings;
  const orgName = siteNameFor(settings, locale);

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/gioi-thieu", label: t("nav.about") },
    ...CATEGORIES.map((c) => ({
      href: `/chuyen-muc/${c.slug}`,
      label: pick(c.nameVi, c.nameEn, locale),
    })),
    { href: "/ket-noi", label: t("nav.connect") },
    { href: "/lang-nghe-dan-noi", label: t("nav.contact") },
  ];

  return (
    // Header nằm trong luồng bình thường. Hai dải trên cuộn đi tự nhiên, riêng
    // thanh điều hướng tự dính lại đỉnh (xem NavLinks) — không animation nên
    // không có gì để giật. Xem chú thích .site-header trong globals.css.
    // pointer-events-none trên <header> + auto trên từng dải con: khi menu gom
    // dòng, NavLinks chèn một ô đệm vô hình để giữ chiều cao trang (chống nhấp
    // nháy). Ô đệm đó nằm trong khung header đang dính nên sẽ phủ lên ~82px nội
    // dung bên dưới và nuốt mất cú bấm; trả pointer-events về cho đúng các dải
    // có nội dung thật thì phần trống không còn chặn gì.
    <header className="site-header pointer-events-none">
      {/* Dải tiện ích */}
      <div className="site-header-band pointer-events-auto bg-red-900 text-red-50">
        <div className="mx-auto flex w-full max-w-container items-center justify-between gap-3 px-4 py-1.5 text-xs">
          <span className="hidden sm:inline">{t("header.portal")}</span>
          <div className="flex items-center gap-3">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="hidden hover:underline md:inline"
              >
                {contact.email}
              </a>
            )}
            <Link href="/ket-noi" className="hover:underline">
              {t("header.contact")}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Banner thương hiệu */}
      <div className="site-header-band pointer-events-auto bg-gradient-to-r from-red-700 to-red-800 text-white">
        <div className="mx-auto w-full max-w-container px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <Emblem className="h-12 w-12 shrink-0 sm:h-14 sm:w-14" />
            <span className="min-w-0">
              <span className="block text-sm font-bold uppercase leading-tight sm:text-lg">
                {orgName}
              </span>
              <span className="block text-xs text-red-100 sm:text-sm">
                {t("site.title")}
              </span>
            </span>
          </Link>
        </div>
      </div>

      {/* Thanh điều hướng — tự dính lên đỉnh khi cuộn qua (xem NavLinks).
          Dải tiện ích + banner cuộn đi, chỉ giữ lại phần quan trọng: menu. */}
      <NavLinks items={navItems} />
    </header>
  );
}

