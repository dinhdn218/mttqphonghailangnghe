import { DEFAULT_LOCALE, type Locale } from "@/lib/constants";

// Chọn giá trị theo ngôn ngữ. Khi chưa có bản En thì fallback về Vi.
// (next-intl đầy đủ sẽ làm ở bước sau — hiện mặc định tiếng Việt.)
export function pick(
  vi: string,
  en: string | null | undefined,
  locale: Locale = DEFAULT_LOCALE,
): string {
  if (locale === "en" && en) return en;
  return vi;
}
