import { prisma } from "@/lib/prisma";
import { PostStatus } from "@/generated/prisma/client";

// Truy vấn dữ liệu cho phần công khai. Chỉ trả về bài đã DUYỆT (PUBLISHED).

export function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({ where: { slug } });
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
