// Dữ liệu bài viết tối thiểu cho các khối ở trang chủ.
export type HomePost = {
  id: string;
  slug: string;
  titleVi: string;
  titleEn: string | null;
  excerptVi: string | null;
  excerptEn: string | null;
  coverImage: string | null;
  publishedAt: Date | null;
  category: { slug: string; nameVi: string; nameEn: string | null };
};
