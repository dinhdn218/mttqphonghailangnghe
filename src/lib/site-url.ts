// Nguồn duy nhất cho URL gốc của site. Dùng cho metadata, sitemap, robots,
// JSON-LD… để tất cả nhất quán một tên miền.
//
// NEXT_PUBLIC_SITE_URL có thể bị đặt sai (thiếu https://, hoặc là URL preview
// của Vercel). Ở đây kiểm tra chặt: chỉ chấp nhận URL http(s) hợp lệ, còn lại
// lùi về tên miền chính thức để không bao giờ sinh ra <loc>/canonical hỏng.
const FALLBACK = "https://phonghailangnghe.com";

export function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw && /^https?:\/\//i.test(raw)) {
    try {
      return new URL(raw);
    } catch {
      /* rơi xuống fallback */
    }
  }
  return new URL(FALLBACK);
}

// Chuỗi origin, KHÔNG có dấu "/" ở cuối (tiện ghép "${base}/duong-dan").
export function getSiteUrlString(): string {
  return getSiteUrl().origin;
}
