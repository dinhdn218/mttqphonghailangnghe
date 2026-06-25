import { prisma } from "@/lib/prisma";
import { PostStatus } from "@/generated/prisma/client";

// Truy vấn dữ liệu cho phần công khai. Chỉ trả về bài đã DUYỆT (PUBLISHED).

export function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({ where: { slug } });
}

export function getCategoriesOrdered() {
  return prisma.category.findMany({ orderBy: { order: "asc" } });
}

export const POSTS_PER_PAGE = 9;

// Bài đã đăng theo chuyên mục, có phân trang. Trả kèm tổng số để tính số trang.
export async function getPublishedPostsByCategory(
  categoryId: string,
  page = 1,
) {
  const skip = (Math.max(1, page) - 1) * POSTS_PER_PAGE;
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { status: PostStatus.PUBLISHED, categoryId },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      include: { category: true },
      skip,
      take: POSTS_PER_PAGE,
    }),
    prisma.post.count({
      where: { status: PostStatus.PUBLISHED, categoryId },
    }),
  ]);
  return { posts, total, totalPages: Math.max(1, Math.ceil(total / POSTS_PER_PAGE)) };
}

export function getPublishedPostBySlug(slug: string) {
  return prisma.post.findFirst({
    where: { slug, status: PostStatus.PUBLISHED },
    include: { category: true, author: { select: { name: true } } },
  });
}

// Tin liên quan: cùng chuyên mục, khác bài hiện tại, mới nhất.
export function getRelatedPosts(
  categoryId: string,
  excludeId: string,
  take = 3,
) {
  return prisma.post.findMany({
    where: {
      status: PostStatus.PUBLISHED,
      categoryId,
      id: { not: excludeId },
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take,
    include: { category: true },
  });
}

// Bài nổi bật cho khối đầu trang chủ: ưu tiên bài đánh dấu featured,
// nếu chưa đủ (hoặc chưa đánh dấu) thì lấp bằng bài mới nhất.
export async function getFeaturedPosts(take = 5) {
  const featured = await prisma.post.findMany({
    where: { status: PostStatus.PUBLISHED, featured: true },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take,
    include: { category: true },
  });
  if (featured.length >= take) return featured;

  const fill = await prisma.post.findMany({
    where: {
      status: PostStatus.PUBLISHED,
      id: { notIn: featured.map((p) => p.id) },
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: take - featured.length,
    include: { category: true },
  });
  return [...featured, ...fill];
}

// 5 bài mới nhất của một chuyên mục (cho khối danh mục ở trang chủ).
export function getLatestByCategory(categoryId: string, take = 5) {
  return prisma.post.findMany({
    where: { status: PostStatus.PUBLISHED, categoryId },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take,
    include: { category: true },
  });
}

export function getRecentPublishedPosts(take = 6) {
  return prisma.post.findMany({
    where: { status: PostStatus.PUBLISHED },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take,
    include: { category: true },
  });
}

// Slug các bài đã đăng — dùng cho generateStaticParams nếu cần.
export async function getPublishedPostSlugs() {
  const posts = await prisma.post.findMany({
    where: { status: PostStatus.PUBLISHED },
    select: { slug: true },
  });
  return posts.map((p) => p.slug);
}
