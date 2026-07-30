// Import bài viết Facebook (dữ liệu khai báo ở scripts/fb-posts-data.ts) vào bảng Post.
// Chạy: npx tsx --env-file=.env scripts/import-fb-posts.ts
//
// - Bỏ qua bài đã tồn tại (so theo titleVi) -> chạy lại an toàn khi thêm bài mới vào data file.
// - Đăng thẳng PUBLISHED (khách đã duyệt nội dung trên Facebook), tác giả gán cho tài khoản ADMIN.
// - Nội dung thô (có xuống dòng) được tách thành các <p> khi lưu contentVi (HTML cho Tiptap).
import { prisma } from "../src/lib/prisma";
import { uniquePostSlug } from "../src/lib/slug";
import { FB_POSTS, type FbPostInput } from "./fb-posts-data";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function toHtmlParagraphs(raw: string): string {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");
}

function toExcerpt(raw: string, max = 160): string {
  const firstLine = raw.split("\n").map((l) => l.trim()).find((l) => l.length > 0) ?? "";
  return firstLine.length > max ? `${firstLine.slice(0, max).trimEnd()}…` : firstLine;
}

async function importOne(input: FbPostInput, authorId: string) {
  const existing = await prisma.post.findFirst({ where: { titleVi: input.titleVi } });
  if (existing) {
    console.log(`⏭  Bỏ qua (đã có): ${input.titleVi.slice(0, 60)}...`);
    return;
  }

  const category = await prisma.category.findUnique({ where: { slug: input.categorySlug } });
  if (!category) {
    console.error(`✘ Không tìm thấy chuyên mục "${input.categorySlug}" — bỏ qua bài: ${input.titleVi}`);
    return;
  }

  const slug = await uniquePostSlug(input.titleVi);
  await prisma.post.create({
    data: {
      slug,
      titleVi: input.titleVi,
      excerptVi: input.excerptVi ?? toExcerpt(input.contentVi),
      contentVi: toHtmlParagraphs(input.contentVi),
      coverImage: input.coverImage ?? null,
      featured: input.featured ?? false,
      status: "PUBLISHED",
      publishedAt: new Date(`${input.publishedAt}T00:00:00`),
      categoryId: category.id,
      authorId,
    },
  });
  console.log(`✔ Đã thêm: ${input.titleVi.slice(0, 60)}...`);
}

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (!admin) throw new Error("Không tìm thấy tài khoản ADMIN để gán làm tác giả.");

  for (const post of FB_POSTS) {
    await importOne(post, admin.id);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
