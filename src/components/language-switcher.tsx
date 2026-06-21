"use client";

import { useLocale } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";

// Chuyển VI ⇄ EN, giữ nguyên trang hiện tại (usePathname đã bỏ tiền tố locale).
export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 text-xs font-medium">
      <Link
        href={pathname}
        locale="vi"
        className={`rounded px-2 py-1 transition ${
          locale === "vi"
            ? "bg-red-700 text-white"
            : "text-gray-600 hover:bg-gray-200"
        }`}
      >
        VI
      </Link>
      <Link
        href={pathname}
        locale="en"
        className={`rounded px-2 py-1 transition ${
          locale === "en"
            ? "bg-red-700 text-white"
            : "text-gray-600 hover:bg-gray-200"
        }`}
      >
        EN
      </Link>
    </div>
  );
}
