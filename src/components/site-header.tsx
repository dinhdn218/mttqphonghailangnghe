import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CATEGORIES, type Locale } from "@/lib/constants";
import { pick } from "@/lib/i18n";
import { getSettings } from "@/lib/settings";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Emblem } from "@/components/emblem";
import { NavLinks } from "@/components/nav-links";

// Header phong cách cổng thông tin điện tử cơ quan nhà nước:
// dải tiện ích → banner thương hiệu (quốc huy + tên cơ quan) → thanh điều hướng đỏ.
export async function SiteHeader() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const { contact } = await getSettings();

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
    <header>
      {/* Dải tiện ích */}
      <div className="bg-red-900 text-red-50">
        <div className="mx-auto flex w-full max-w-container items-center justify-between gap-3 px-4 py-1.5 text-xs">
          <span className="hidden sm:inline">{t("header.portal")}</span>
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="hidden hover:underline md:inline"
            >
              {contact.email}
            </a>
            <Link href="/ket-noi" className="hover:underline">
              {t("header.contact")}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Banner thương hiệu */}
      <div className="bg-gradient-to-r from-red-700 to-red-800 text-white">
        <div className="mx-auto w-full max-w-container px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <Emblem className="h-12 w-12 shrink-0 sm:h-14 sm:w-14" />
            <span className="min-w-0">
              <span className="block text-sm font-bold uppercase leading-tight sm:text-lg">
                {t("site.org")}
              </span>
              <span className="block text-xs text-red-100 sm:text-sm">
                {t("site.title")}
              </span>
            </span>
          </Link>
        </div>
      </div>

      {/* Thanh điều hướng */}
      <nav className="border-t border-red-600/40 bg-red-800">
        <NavLinks items={navItems} />
      </nav>
    </header>
  );
}

