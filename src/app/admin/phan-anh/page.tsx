import Link from "next/link";
import { requireUser } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { AdminSearch } from "@/components/admin/admin-search";
import { FeedbackStatus } from "@/generated/prisma/client";

const PAGE_SIZE = 20;

const STATUS_TABS: { value?: FeedbackStatus; label: string }[] = [
  { value: undefined, label: "Tất cả" },
  { value: "NEW", label: "Mới" },
  { value: "RESOLVED", label: "Đã xử lý" },
];

type Props = {
  searchParams: Promise<{
    status?: string;
    q?: string;
    page?: string;
    deleted?: string;
  }>;
};

export default async function FeedbackListPage({ searchParams }: Props) {
  await requireUser();
  const sp = await searchParams;

  const status =
    sp.status === "NEW" || sp.status === "RESOLVED"
      ? (sp.status as FeedbackStatus)
      : undefined;
  const q = sp.q?.trim() || undefined;
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const where = {
    ...(status ? { status } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" as const } },
            { message: { contains: q, mode: "insensitive" as const } },
            { email: { contains: q, mode: "insensitive" as const } },
            { phone: { contains: q, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [items, total, newCount] = await Promise.all([
    prisma.feedback.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.feedback.count({ where }),
    prisma.feedback.count({ where: { status: "NEW" } }),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const tabHref = (s?: FeedbackStatus) => {
    const params = new URLSearchParams();
    if (s) params.set("status", s);
    if (q) params.set("q", q);
    const qs = params.toString();
    return qs ? `/admin/phan-anh?${qs}` : "/admin/phan-anh";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Phản ánh người dân</h1>
        {newCount > 0 && (
          <span className="bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
            {newCount} phản ánh mới
          </span>
        )}
      </div>

      {sp.deleted && (
        <p className="border-l-4 border-green-600 bg-green-50 px-4 py-3 text-sm text-green-700">
          Đã xoá phản ánh.
        </p>
      )}

      <AdminSearch
        basePath="/admin/phan-anh"
        params={{ status }}
        defaultValue={q}
        placeholder="Tìm theo tên, nội dung, email, sđt…"
      />

      {/* Lọc trạng thái */}
      <div className="flex flex-wrap gap-2 text-sm">
        {STATUS_TABS.map((tab) => {
          const active = status === tab.value;
          return (
            <Link
              key={tab.label}
              href={tabHref(tab.value)}
              className={`px-3 py-1.5 font-medium transition ${
                active
                  ? "bg-red-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      <div className="overflow-hidden border border-gray-200">
        {items.length === 0 ? (
          <p className="p-6 text-center text-gray-500">Chưa có phản ánh nào.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="px-4 py-2 font-medium">Người gửi</th>
                <th className="px-4 py-2 font-medium">Nội dung</th>
                <th className="px-4 py-2 font-medium">Trạng thái</th>
                <th className="hidden px-4 py-2 font-medium md:table-cell">
                  Ngày gửi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((f) => (
                <tr key={f.id} className="align-top hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/phan-anh/${f.id}`}
                      className="font-medium text-gray-900 hover:text-red-700"
                    >
                      {f.name}
                    </Link>
                    {(f.phone || f.email) && (
                      <p className="text-xs text-gray-400">
                        {f.phone ?? f.email}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    <Link
                      href={`/admin/phan-anh/${f.id}`}
                      className="line-clamp-2 hover:text-red-700"
                    >
                      {f.message}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <FeedbackBadge status={f.status} />
                  </td>
                  <td className="hidden px-4 py-3 whitespace-nowrap text-gray-500 md:table-cell">
                    {formatDate(f.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AdminPagination
        page={page}
        totalPages={totalPages}
        basePath="/admin/phan-anh"
        summary={`${total} phản ánh`}
        params={{ status, q }}
      />
    </div>
  );
}

export function FeedbackBadge({ status }: { status: FeedbackStatus }) {
  const isNew = status === "NEW";
  return (
    <span
      className={`inline-block px-2 py-0.5 text-xs font-medium ${
        isNew ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"
      }`}
    >
      {isNew ? "Mới" : "Đã xử lý"}
    </span>
  );
}
