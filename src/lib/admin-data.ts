import { prisma } from "@/lib/prisma";
import { PostStatus, Role } from "@/generated/prisma/client";

type SessionUser = { id: string; role: Role };

// Đếm bài theo trạng thái. EDITOR chỉ thấy bài của mình.
export async function getPostStats(user: SessionUser) {
  const where = user.role === Role.EDITOR ? { authorId: user.id } : {};
  const grouped = await prisma.post.groupBy({
    by: ["status"],
    where,
    _count: { _all: true },
  });

  const counts: Record<PostStatus, number> = {
    DRAFT: 0,
    PENDING: 0,
    PUBLISHED: 0,
    REJECTED: 0,
  };
  for (const g of grouped) counts[g.status] = g._count._all;
  return counts;
}

export const ADMIN_PAGE_SIZE = 20;

// Danh sách bài cho trang quản lý. EDITOR chỉ thấy bài của mình.
// Lọc theo trạng thái + chuyên mục (slug) và phân trang. Trả kèm tổng số trang.
export async function listPostsForUser(
  user: SessionUser,
  opts: {
    status?: PostStatus;
    categorySlug?: string;
    q?: string;
    page?: number;
  } = {},
) {
  const page = Math.max(1, opts.page ?? 1);
  const q = opts.q?.trim();
  const where = {
    ...(user.role === Role.EDITOR ? { authorId: user.id } : {}),
    ...(opts.status ? { status: opts.status } : {}),
    ...(opts.categorySlug ? { category: { slug: opts.categorySlug } } : {}),
    ...(q
      ? {
          OR: [
            { titleVi: { contains: q, mode: "insensitive" as const } },
            { titleEn: { contains: q, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * ADMIN_PAGE_SIZE,
      take: ADMIN_PAGE_SIZE,
      include: {
        category: { select: { nameVi: true } },
        author: { select: { name: true, email: true } },
      },
    }),
    prisma.post.count({ where }),
  ]);

  return {
    posts,
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / ADMIN_PAGE_SIZE)),
  };
}
