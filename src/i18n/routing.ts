import { defineRouting } from "next-intl/routing";

// Định tuyến đa ngôn ngữ: tiếng Việt mặc định (không tiền tố), tiếng Anh dùng /en.
export const routing = defineRouting({
  locales: ["vi", "en"],
  defaultLocale: "vi",
  localePrefix: "as-needed",
  // TẮT tự dò ngôn ngữ trình duyệt: luôn mặc định tiếng Việt, không tự nhảy /en
  // khi trình duyệt người dùng đặt Accept-Language: en. Người dùng tự đổi qua nút VI/EN.
  localeDetection: false,
});
