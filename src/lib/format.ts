// Định dạng ngày kiểu Việt Nam: 21/06/2026
const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "";
  return dateFormatter.format(new Date(date));
}
