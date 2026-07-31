// Tiện ích số điện thoại — thuần, không đụng DB, để client component dùng được.

// Rút gọn còn chữ số, dùng cho href="tel:".
export function telHref(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

// Tách nhóm cho dễ đọc: 0982832656 → 0982 832 656.
// Cán bộ nhập kiểu nào cũng chuẩn hoá được; số lạ (quá ngắn/dài, có ký tự khác)
// thì giữ nguyên như đã nhập để không hiển thị sai.
export function formatPhone(phone: string): string {
  const raw = phone.trim();
  const digits = raw.replace(/\s/g, "");
  if (!/^0\d{9,10}$/.test(digits)) return raw;
  // 10 số → 4-3-3, 11 số → 4-3-4.
  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
}
