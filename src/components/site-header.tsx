import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CATEGORIES, type Locale } from "@/lib/constants";
import { pick } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";

// Header công khai — mobile-first: tiêu đề + thanh chuyên mục cuộn ngang + đổi ngôn ngữ.
export async function SiteHeader() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex w-full max-w-4xl items-start justify-between gap-4 px-4 py-3">
        <Link href="/" className="block">
          <p className="text-xs font-medium text-red-700">{t("site.org")}</p>
          <p className="text-lg font-bold leading-tight">{t("site.title")}</p>
        </Link>
        <LanguageSwitcher />
      </div>
      <nav className="border-t border-gray-100 bg-gray-50">
        <ul className="mx-auto flex w-full max-w-4xl gap-1 overflow-x-auto px-2 py-2 text-sm whitespace-nowrap">
          <li>
            <Link
              href="/gioi-thieu"
              className="inline-block rounded-full px-3 py-1.5 text-gray-700 transition hover:bg-red-100 hover:text-red-800"
            >
              {t("nav.about")}
            </Link>
          </li>
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/chuyen-muc/${c.slug}`}
                className="inline-block rounded-full px-3 py-1.5 text-gray-700 transition hover:bg-red-100 hover:text-red-800"
              >
                {pick(c.nameVi, c.nameEn, locale)}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/ket-noi"
              className="inline-block rounded-full px-3 py-1.5 text-gray-700 transition hover:bg-red-100 hover:text-red-800"
            >
              {t("nav.connect")}
            </Link>
          </li>
          <li>
            <Link
              href="/lang-nghe-dan-noi"
              className="inline-block rounded-full bg-red-700 px-3 py-1.5 font-medium text-white transition hover:bg-red-800"
            >
              {t("nav.contact")}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
