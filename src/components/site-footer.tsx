import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CONTACT } from "@/lib/contacts";

export async function SiteFooter() {
  const t = await getTranslations();

  return (
    <footer className="mt-12 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto grid w-full max-w-4xl gap-6 px-4 py-6 text-sm text-gray-600 sm:grid-cols-2">
        <div>
          <p className="font-semibold text-gray-800">{t("site.org")}</p>
          <p className="mt-1">{t("site.province")}</p>
          <p className="mt-1">{CONTACT.address}</p>
        </div>
        <div className="sm:text-right">
          <p>
            {t("connect.hotline")}:{" "}
            <a
              href={`tel:${CONTACT.hotline.replace(/\s/g, "")}`}
              className="font-medium text-red-700 hover:underline"
            >
              {CONTACT.hotline}
            </a>
          </p>
          <p className="mt-1">
            <Link href="/ket-noi" className="text-red-700 hover:underline">
              {t("nav.connect")}
            </Link>
          </p>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-2 px-4 py-3 text-xs text-gray-500">
          <span>
            © {new Date().getFullYear()} {t("site.org")}.
          </span>
          {/* Khu vực quản trị chỉ tiếng Việt — dùng <a> thường, không gắn locale. */}
          <a href="/admin" className="text-red-700 hover:underline">
            {t("site.admin")}
          </a>
        </div>
      </div>
    </footer>
  );
}
