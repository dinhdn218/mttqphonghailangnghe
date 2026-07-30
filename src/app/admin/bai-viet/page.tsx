import Link from "next/link";
import { requireUser } from "@/lib/auth-guards";
import { listPostsForUser } from "@/lib/admin-data";
import { canCreatePost } from "@/lib/post-permissions";
import { StatusBadge } from "@/components/admin/status-badge";
import { PostFilters } from "@/components/admin/post-filters";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { AdminSearch } from "@/components/admin/admin-search";
import { formatDate } from "@/lib/format";
import { PostStatus } from "@/generated/prisma/client";
import { STATUS_LABELS, CATEGORIES } from "@/lib/constants";
import { ToastFromParams } from "@/components/admin/toast-from-params";

const STATUS_VALUES = Object.values(PostStatus);
const STATUS_OPTIONS = STATUS_VALUES.map((v) => ({
  value: v,
  label: STATUS_LABELS[v],
}));

type Props = {
  searchParams: Promise<{
    status?: string;
    category?: string;
    q?: string;
    page?: string;
  }>;
};

export default async function PostListPage({ searchParams }: Props) {
  const user = await requireUser();
  const sp = await searchParams;

  const status = STATUS_VALUES.includes(sp.status as PostStatus)
    ? (sp.status as PostStatus)
    : undefined;
  const category = CATEGORIES.find((c) => c.slug === sp.category)?.slug;
  const q = sp.q?.trim() || undefined;
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);

  const { posts, total, page: curPage, totalPages } = await listPostsForUser(
    user,
    { status, categorySlug: category, q, page },
  );

  return (
    <div className="space-y-4">
      <ToastFromParams
        toasts={[{ param: "deleted", message: "Đã xoá bài viết.", color: "success" }]}
      />

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

      <AdminSearch
        basePath="/admin/bai-viet"
        params={{ status, category }}
        defaultValue={q}
        placeholder="Tìm theo tiêu đề…"
      />

      {/* Bộ lọc: trạng thái + chuyên mục */}
      <PostFilters
        statuses={STATUS_OPTIONS}
        categories={CATEGORIES.map((c) => ({ slug: c.slug, nameVi: c.nameVi }))}
        status={status}
        category={category}
        q={q}
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
      <AdminPagination
        page={curPage}
        totalPages={totalPages}
        basePath="/admin/bai-viet"
        summary={`${total} bài`}
        params={{ status, category, q }}
      />
    </div>
  );
}
