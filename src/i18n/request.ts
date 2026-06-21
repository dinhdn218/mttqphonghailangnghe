import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// Nạp message theo locale của request. Route không có tiền tố (admin, đăng nhập)
// sẽ rơi về locale mặc định (vi).
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "vi" | "en")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
