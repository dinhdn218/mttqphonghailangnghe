import { defineRouting } from "next-intl/routing";

// Định tuyến đa ngôn ngữ: tiếng Việt mặc định (không tiền tố), tiếng Anh dùng /en.
export const routing = defineRouting({
  locales: ["vi", "en"],
  defaultLocale: "vi",
  localePrefix: "as-needed",
});
