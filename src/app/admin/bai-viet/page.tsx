import Link from "next/link";
import { requireUser } from "@/lib/auth-guards";
import { listPostsForUser } from "@/lib/admin-data";
import { canCreatePost } from "@/lib/post-permissions";
import { StatusBadge } from "@/components/admin/status-badge";
import { formatDate } from "@/lib/format";
import { PostStatus } from "@/generated/prisma/client";
import { STATUS_LABELS } from "@/lib/constants";

const STATUS_VALUES = Object.values(PostStatus);

type Props = { searchParams: Promise<{ status?: string }> };

export default async function PostListPage({ searchParams }: Props) {
  const user = await requireUser();
  const { status: statusParam } = await searchParams;
  const status = STATUS_VALUES.includes(statusParam as PostStatus)
    ? (statusParam as PostStatus)
    : undefined;

  const posts = await listPostsForUser(user, status);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Bài viết</h1>
        {canCreatePost(user) && (
          <Link
            href="/admin/bai-viet/moi"
            className="rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-800"
          >
            + Viết bài mới
          </Link>
        )}
      </div>

      {/* Bộ lọc trạng thái */}
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <FilterTab href="/admin/bai-viet" active={!status}>
          Tất cả
        </FilterTab>
        {STATUS_VALUES.map((s) => (
          <FilterTab
            key={s}
            href={`/admin/bai-viet?status=${s}`}
            active={status === s}
          >
            {STATUS_LABELS[s]}
          </FilterTab>
        ))}
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
        {posts.length === 0 ? (
          <p className="p-6 text-center text-gray-500">Chưa có bài viết.</p>
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
    </div>
  );
}

function FilterTab({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-3 py-1.5 transition ${
        active
          ? "bg-red-700 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {children}
    </Link>
  );
}
