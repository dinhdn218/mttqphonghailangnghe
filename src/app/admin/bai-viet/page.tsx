import Link from "next/link";
import { requireUser } from "@/lib/auth-guards";
import { listPostsForUser } from "@/lib/admin-data";
import { canCreatePost } from "@/lib/post-permissions";
import { StatusBadge } from "@/components/admin/status-badge";
import { PostFilters } from "@/components/admin/post-filters";
import { formatDate } from "@/lib/format";
import { PostStatus } from "@/generated/prisma/client";
import { STATUS_LABELS, CATEGORIES } from "@/lib/constants";

const STATUS_VALUES = Object.values(PostStatus);
const STATUS_OPTIONS = STATUS_VALUES.map((v) => ({
  value: v,
  label: STATUS_LABELS[v],
}));

type Props = {
  searchParams: Promise<{ status?: string; category?: string; page?: string }>;
};

export default async function PostListPage({ searchParams }: Props) {
  const user = await requireUser();
  const sp = await searchParams;

  const status = STATUS_VALUES.includes(sp.status as PostStatus)
    ? (sp.status as PostStatus)
    : undefined;
  const category = CATEGORIES.find((c) => c.slug === sp.category)?.slug;
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);

  const { posts, total, page: curPage, totalPages } = await listPostsForUser(
    user,
    { status, categorySlug: category, page },
  );

  // Link phân trang giữ nguyên bộ lọc hiện tại.
  const pageHref = (p: number) => {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (category) params.set("category", category);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/admin/bai-viet?${qs}` : "/admin/bai-viet";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Bài viết</h1>
        {canCreatePost(user) && (
          <Link
            href="/admin/bai-viet/moi"
            className="bg-red-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-800"
          >
            + Viết bài mới
          </Link>
        )}
      </div>

      {/* Bộ lọc: trạng thái + chuyên mục */}
      <PostFilters
        statuses={STATUS_OPTIONS}
        categories={CATEGORIES.map((c) => ({ slug: c.slug, nameVi: c.nameVi }))}
        status={status}
        category={category}
      />

      <div className="overflow-hidden border border-gray-200">
        {posts.length === 0 ? (
          <p className="p-6 text-center text-gray-500">
            Không có bài viết phù hợp.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="px-4 py-2 font-medium">Tiêu đề</th>
                <th className="hidden px-4 py-2 font-medium sm:table-cell">
                  Chuyên mục
                </th>
                <th className="px-4 py-2 font-medium">Trạng thái</th>
                <th className="hidden px-4 py-2 font-medium md:table-cell">
                  Cập nhật
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/bai-viet/${post.id}`}
                      className="font-medium text-gray-900 hover:text-red-700"
                    >
                      {post.titleVi}
                    </Link>
                    <p className="text-xs text-gray-400 sm:hidden">
                      {post.category.nameVi}
                    </p>
                  </td>
                  <td className="hidden px-4 py-3 text-gray-600 sm:table-cell">
                    {post.category.nameVi}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={post.status} />
                  </td>
                  <td className="hidden px-4 py-3 text-gray-500 md:table-cell">
                    {formatDate(post.updatedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Tổng số + phân trang */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-500">
        <span>
          {total > 0
            ? `${total} bài · trang ${curPage}/${totalPages}`
            : "0 bài"}
        </span>
        {totalPages > 1 && (
          <nav className="flex items-center gap-1">
            <PageLink href={pageHref(curPage - 1)} disabled={curPage <= 1}>
              ‹
            </PageLink>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => Math.abs(p - curPage) <= 2 || p === 1 || p === totalPages)
              .map((p, idx, arr) => (
                <span key={p} className="flex items-center gap-1">
                  {idx > 0 && p - arr[idx - 1] > 1 && (
                    <span className="px-1 text-gray-400">…</span>
                  )}
                  <PageLink href={pageHref(p)} active={p === curPage}>
                    {p}
                  </PageLink>
                </span>
              ))}
            <PageLink
              href={pageHref(curPage + 1)}
              disabled={curPage >= totalPages}
            >
              ›
            </PageLink>
          </nav>
        )}
      </div>
    </div>
  );
}

// Ô phân trang vuông; vô hiệu hoá thì render span thay vì link.
function PageLink({
  href,
  active,
  disabled,
  children,
}: {
  href: string;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const base =
    "flex h-9 min-w-9 items-center justify-center border px-2 text-sm font-medium";
  if (disabled) {
    return (
      <span className={`${base} border-gray-200 text-gray-300`}>{children}</span>
    );
  }
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`${base} ${
        active
          ? "border-red-700 bg-red-700 text-white"
          : "border-gray-300 text-gray-700 hover:bg-gray-100"
      }`}
    >
      {children}
    </Link>
  );
}
