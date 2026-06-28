import Link from "next/link";
import { requireUser } from "@/lib/auth-guards";
import { getPostStats } from "@/lib/admin-data";
import { canCreatePost } from "@/lib/post-permissions";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { Role } from "@/generated/prisma/client";

export default async function AdminDashboard() {
  const user = await requireUser();
  const isStaffReviewer =
    user.role === Role.APPROVER || user.role === Role.ADMIN;

  const [stats, newFeedback, recentFeedback, pendingPosts] = await Promise.all([
    getPostStats(user),
    prisma.feedback.count({ where: { status: "NEW" } }),
    prisma.feedback.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.post.findMany({
      where: {
        status: "PENDING",
        ...(user.role === Role.EDITOR ? { authorId: user.id } : {}),
      },
      orderBy: { updatedAt: "desc" },
      take: 5,
      include: { category: { select: { nameVi: true } } },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Tổng quan</h1>
        <p className="mt-1 text-gray-600">
          Xin chào, quản lý nội dung trang tuyên truyền MTTQ xã Phong Hải.
        </p>
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Bản nháp" value={stats.DRAFT} href="/admin/bai-viet?status=DRAFT" />
        <StatCard label="Chờ duyệt" value={stats.PENDING} href="/admin/bai-viet?status=PENDING" accent />
        <StatCard label="Đã đăng" value={stats.PUBLISHED} href="/admin/bai-viet?status=PUBLISHED" />
        <StatCard label="Bị trả lại" value={stats.REJECTED} href="/admin/bai-viet?status=REJECTED" />
        <StatCard
          label="Phản ánh mới"
          value={newFeedback}
          href="/admin/phan-anh?status=NEW"
          accent={newFeedback > 0}
        />
      </div>

      {/* Hành động nhanh */}
      <div className="flex flex-wrap gap-3">
        {canCreatePost(user) && (
          <Link
            href="/admin/bai-viet/moi"
            className="bg-red-700 px-4 py-2 font-medium text-white transition hover:bg-red-800"
          >
            + Viết bài mới
          </Link>
        )}
        {isStaffReviewer && (
          <Link
            href="/admin/bai-viet?status=PENDING"
            className="border border-amber-300 bg-amber-50 px-4 py-2 font-medium text-amber-800 transition hover:bg-amber-100"
          >
            Duyệt bài chờ ({stats.PENDING})
          </Link>
        )}
        <Link
          href="/admin/phan-anh"
          className="border border-gray-300 px-4 py-2 font-medium transition hover:bg-gray-50"
        >
          Phản ánh người dân
        </Link>
      </div>

      {/* Hai cột: phản ánh gần đây + bài chờ duyệt */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel
          title="Phản ánh gần đây"
          href="/admin/phan-anh"
          empty="Chưa có phản ánh nào."
          rows={recentFeedback.map((f) => ({
            id: f.id,
            href: `/admin/phan-anh/${f.id}`,
            primary: f.name,
            secondary: f.message,
            meta: formatDate(f.createdAt),
            badge: f.status === "NEW" ? "Mới" : undefined,
          }))}
        />
        <Panel
          title="Bài chờ duyệt"
          href="/admin/bai-viet?status=PENDING"
          empty="Không có bài nào đang chờ duyệt."
          rows={pendingPosts.map((p) => ({
            id: p.id,
            href: `/admin/bai-viet/${p.id}`,
            primary: p.titleVi,
            secondary: p.category.nameVi,
            meta: formatDate(p.updatedAt),
          }))}
        />
      </div>

      {user.role === Role.EDITOR && (
        <p className="text-sm text-gray-500">
          Bạn là Biên tập viên — chỉ thấy bài của mình. Bài cần được Duyệt trước
          khi đăng công khai.
        </p>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
  accent,
}: {
  label: string;
  value: number;
  href: string;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`border p-4 transition hover:shadow-sm ${
        accent
          ? "border-amber-200 bg-amber-50"
          : "border-gray-200 bg-white hover:border-red-300"
      }`}
    >
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </Link>
  );
}

type Row = {
  id: string;
  href: string;
  primary: string;
  secondary: string;
  meta: string;
  badge?: string;
};

function Panel({
  title,
  href,
  empty,
  rows,
}: {
  title: string;
  href: string;
  empty: string;
  rows: Row[];
}) {
  return (
    <section className="border border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <h2 className="font-bold text-gray-800">{title}</h2>
        <Link href={href} className="text-sm text-red-700 hover:underline">
          Xem tất cả →
        </Link>
      </div>
      {rows.length === 0 ? (
        <p className="px-4 py-6 text-center text-sm text-gray-500">{empty}</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {rows.map((r) => (
            <li key={r.id}>
              <Link
                href={r.href}
                className="flex items-start justify-between gap-3 px-4 py-3 hover:bg-gray-50"
              >
                <div className="min-w-0">
                  <p className="flex items-center gap-2 font-medium text-gray-900">
                    <span className="line-clamp-1">{r.primary}</span>
                    {r.badge && (
                      <span className="shrink-0 bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-800">
                        {r.badge}
                      </span>
                    )}
                  </p>
                  <p className="line-clamp-1 text-sm text-gray-500">
                    {r.secondary}
                  </p>
                </div>
                <span className="shrink-0 text-xs whitespace-nowrap text-gray-400">
                  {r.meta}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
