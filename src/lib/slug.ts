import { prisma } from "@/lib/prisma";

// Chuyển tiêu đề tiếng Việt thành slug ASCII: "Tin tức – Sự kiện" -> "tin-tuc-su-kien"
export function slugify(input: string): string {
  return input
    .normalize("NFD") // tách dấu khỏi ký tự
    .replace(/[̀-ͯ]/g, "") // bỏ dấu thanh (combining marks)
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // ký tự lạ -> gạch nối
    .replace(/^-+|-+$/g, "") // bỏ gạch nối đầu/cuối
    .slice(0, 80);
}

// Tạo slug duy nhất cho Post. Nếu trùng thì thêm hậu tố -2, -3...
// excludeId: bỏ qua chính bài đang sửa khi kiểm tra trùng.
export async function uniquePostSlug(
  title: string,
  excludeId?: string,
): Promise<string> {
  const base = slugify(title) || "bai-viet";
  let slug = base;
  let i = 1;

  while (true) {
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (!existing || existing.id === excludeId) return slug;
    i += 1;
    slug = `${base}-${i}`;
  }
}
