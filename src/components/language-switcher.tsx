"use client";

import { useLocale } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";

// Chuyển VI ⇄ EN, giữ nguyên trang hiện tại. Style cho dải tiện ích nền đỏ đậm.
export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 text-xs font-medium">
      <Link
        href={pathname}
        locale="vi"
        className={`rounded px-1.5 py-0.5 transition ${
          locale === "vi"
            ? "bg-white text-red-800"
            : "text-red-100 hover:bg-red-800"
        }`}
      >
        VI
      </Link>
      <span className="text-red-300">|</span>
      <Link
        href={pathname}
        locale="en"
        className={`rounded px-1.5 py-0.5 transition ${
          locale === "en"
            ? "bg-white text-red-800"
            : "text-red-100 hover:bg-red-800"
        }`}
      >
        EN
      </Link>
    </div>
  );
}
