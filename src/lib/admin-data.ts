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

// Danh sách bài cho trang quản lý. EDITOR chỉ thấy bài của mình.
// Lọc theo trạng thái nếu truyền `status`.
export function listPostsForUser(
  user: SessionUser,
  status?: PostStatus,
) {
  return prisma.post.findMany({
    where: {
      ...(user.role === Role.EDITOR ? { authorId: user.id } : {}),
      ...(status ? { status } : {}),
    },
    orderBy: { updatedAt: "desc" },
    include: {
      category: { select: { nameVi: true } },
      author: { select: { name: true, email: true } },
    },
  });
}
