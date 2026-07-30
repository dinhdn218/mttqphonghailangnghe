import Link from "next/link";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { ROLE_LABELS } from "@/lib/constants";
import { Role } from "@/generated/prisma/client";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { AdminSearch } from "@/components/admin/admin-search";
import { ToastFromParams } from "@/components/admin/toast-from-params";
import { deleteUser } from "./actions";

const ROLE_BADGE: Record<string, string> = {
  ADMIN: "bg-red-100 text-red-800",
  APPROVER: "bg-amber-100 text-amber-800",
  EDITOR: "bg-gray-100 text-gray-700",
};

const ERROR_MESSAGES: Record<string, string> = {
  self: "Bạn không thể xoá chính tài khoản đang đăng nhập.",
  lastadmin: "Phải còn ít nhất một tài khoản Quản trị.",
  hasposts: "Không thể xoá: người dùng này vẫn còn bài viết. Hãy chuyển/đổi tác giả các bài trước.",
};

const PAGE_SIZE = 20;

type Props = {
  searchParams: Promise<{
    error?: string;
    deleted?: string;
    saved?: string;
    q?: string;
    page?: string;
  }>;
};

export default async function UserListPage({ searchParams }: Props) {
  const current = await requireUser();
  if (current.role !== Role.ADMIN) redirect("/admin");

  const sp = await searchParams;
  const q = sp.q?.trim() || undefined;
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);

  const where = q
    ? {
        OR: [
          { name: { contains: q, mode: "insensitive" as const } },
          { email: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: [{ role: "asc" }, { createdAt: "asc" }],
      include: { _count: { select: { authoredPosts: true } } },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.user.count({ where }),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-4">
      <ToastFromParams
        toasts={[
          { param: "error", match: "self", message: ERROR_MESSAGES.self, color: "danger" },
          { param: "error", match: "lastadmin", message: ERROR_MESSAGES.lastadmin, color: "danger" },
          { param: "error", match: "hasposts", message: ERROR_MESSAGES.hasposts, color: "danger" },
          { param: "deleted", message: "Đã xoá tài khoản.", color: "success" },
          { param: "saved", match: "created", message: "Đã tạo tài khoản.", color: "success" },
          { param: "saved", match: "updated", message: "Đã lưu thay đổi.", color: "success" },
        ]}
      />

      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Người dùng</h1>
        <Link
          href="/admin/nguoi-dung/moi"
          className="bg-red-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-800"
        >
          + Thêm người dùng
        </Link>
      </div>

      <AdminSearch
        basePath="/admin/nguoi-dung"
        defaultValue={q}
        placeholder="Tìm theo tên hoặc email…"
      />

      <div className="overflow-x-auto border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="px-4 py-2 font-medium">Họ tên</th>
              <th className="hidden px-4 py-2 font-medium sm:table-cell">
                Email
              </th>
              <th className="px-4 py-2 font-medium">Vai trò</th>
              <th className="hidden px-4 py-2 font-medium md:table-cell">
                Bài viết
              </th>
              <th className="hidden px-4 py-2 font-medium lg:table-cell">
                Tạo lúc
              </th>
              <th className="px-4 py-2 text-right font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => {
              const isSelf = u.id === current.id;
              return (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="font-medium text-gray-900">
                      {u.name ?? "—"}
                    </span>
                    {isSelf && (
                      <span className="ml-2 text-xs text-gray-400">(bạn)</span>
                    )}
                    <p className="text-xs text-gray-400 sm:hidden">{u.email}</p>
                  </td>
                  <td className="hidden px-4 py-3 break-all text-gray-600 sm:table-cell">
                    {u.email}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 text-xs font-medium ${
                        ROLE_BADGE[u.role] ?? "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {ROLE_LABELS[u.role] ?? u.role}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 text-gray-500 md:table-cell">
                    {u._count.authoredPosts}
                  </td>
                  <td className="hidden px-4 py-3 text-gray-500 lg:table-cell">
                    {formatDate(u.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/nguoi-dung/${u.id}`}
                        className="font-medium text-red-700 hover:underline"
                      >
                        Sửa
                      </Link>
                      {!isSelf && (
                        <form action={deleteUser}>
                          <input type="hidden" name="id" value={u.id} />
                          <button
                            type="submit"
                            className="font-medium text-gray-400 hover:text-red-600"
                          >
                            Xoá
                          </button>
                        </form>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <AdminPagination
        page={page}
        totalPages={totalPages}
        basePath="/admin/nguoi-dung"
        summary={`${total} người dùng`}
        params={{ q }}
      />
    </div>
  );
}
