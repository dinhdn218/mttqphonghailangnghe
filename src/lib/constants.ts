// Danh mục nội dung dùng chung khuôn "Post". Tương ứng các chuyên mục 1–8 trong CLAUDE.md.
// (Mục 9 "Lắng nghe dân nói" là form; 10 Zalo OA, 11 Mã QR là trang đặc biệt — không phải post category.)
export const CATEGORIES = [
  { slug: "tin-tuc-su-kien", nameVi: "Tin tức – Sự kiện", nameEn: "News & Events" },
  { slug: "chuyen-doi-so", nameVi: "Chuyển đổi số cộng đồng", nameEn: "Community Digital Transformation" },
  { slug: "dich-vu-cong", nameVi: "Hướng dẫn dịch vụ công trực tuyến", nameEn: "Online Public Services" },
  { slug: "mo-hinh-hay", nameVi: "Mô hình hay – Phong trào thi đua", nameEn: "Good Models & Emulation" },
  { slug: "cuoc-van-dong", nameVi: "Các cuộc vận động", nameEn: "Campaigns" },
  { slug: "nguoi-tot-viec-tot", nameVi: "Gương người tốt việc tốt", nameEn: "Good People, Good Deeds" },
  { slug: "doi-song-van-hoa-moi", nameVi: "Cải tạo tập tục – đời sống văn hóa mới", nameEn: "New Cultural Life" },
  { slug: "thu-vien", nameVi: "Thư viện", nameEn: "Library" },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

// Ngôn ngữ hỗ trợ (next-intl) — Việt mặc định, Anh phụ.
export const LOCALES = ["vi", "en"] as const;
export const DEFAULT_LOCALE = "vi" as const;
export type Locale = (typeof LOCALES)[number];

// Nhãn vai trò hiển thị trong CMS.
export const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Quản trị",
  EDITOR: "Biên tập",
  APPROVER: "Duyệt",
};

export const STATUS_LABELS: Record<string, string> = {
  DRAFT: "Bản nháp",
  PENDING: "Chờ duyệt",
  PUBLISHED: "Đã đăng",
  REJECTED: "Bị trả lại",
};
