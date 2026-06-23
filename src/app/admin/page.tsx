import Link from "next/link";
import { requireUser } from "@/lib/auth-guards";
import { getPostStats } from "@/lib/admin-data";
import { canCreatePost } from "@/lib/post-permissions";
import { Role } from "@/generated/prisma/client";

export default async function AdminDashboard() {
  const user = await requireUser();
  const stats = await getPostStats(user);

  return (
    <div>
      <h1 className="text-2xl font-bold">Tổng quan</h1>
      <p className="mt-1 text-gray-600">
        Xin chào, quản lý nội dung trang tuyên truyền MTTQ xã Phong Hải.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Bản nháp" value={stats.DRAFT} href="/admin/bai-viet?status=DRAFT" />
        <StatCard label="Chờ duyệt" value={stats.PENDING} href="/admin/bai-viet?status=PENDING" accent />
        <StatCard label="Đã đăng" value={stats.PUBLISHED} href="/admin/bai-viet?status=PUBLISHED" />
        <StatCard label="Bị trả lại" value={stats.REJECTED} href="/admin/bai-viet?status=REJECTED" />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {canCreatePost(user) && (
          <Link
            href="/admin/bai-viet/moi"
            className="rounded-lg bg-red-700 px-4 py-2 font-medium text-white transition hover:bg-red-800"
          >
            + Viết bài mới
          </Link>
        )}
        {(user.role === Role.APPROVER || user.role === Role.ADMIN) && (
          <Link
            href="/admin/bai-viet?status=PENDING"
            className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 font-medium text-amber-800 transition hover:bg-amber-100"
          >
            Duyệt bài chờ ({stats.PENDING})
          </Link>
        )}
        <Link
          href="/admin/bai-viet"
          className="rounded-lg border border-gray-300 px-4 py-2 font-medium transition hover:bg-gray-50"
        >
          Tất cả bài viết
        </Link>
      </div>

      {user.role === Role.EDITOR && (
        <p className="mt-6 text-sm text-gray-500">
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
      className={`rounded-xl border p-4 transition hover:shadow-sm ${
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
