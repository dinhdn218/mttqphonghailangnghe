import Link from "next/link";
import { requireUser } from "@/lib/auth-guards";
import { getPostStats } from "@/lib/admin-data";
import { canCreatePost } from "@/lib/post-permissions";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { ROLE_LABELS } from "@/lib/constants";
import { Role } from "@/generated/prisma/client";

// Icon outline (Heroicons) qua path.
function Icon({ path, className }: { path: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "h-5 w-5"}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

const ICONS = {
  draft:
    "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10",
  clock: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  check: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  reject: "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  chat: "M7.5 8.25h9m-9 3H12m9 .75c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z",
  plus: "M12 4.5v15m7.5-7.5h-15",
  inbox:
    "M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z",
  doc: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
};

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

  const today = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="space-y-6">
      {/* Banner chào */}
      <header className="relative overflow-hidden bg-gradient-to-r from-red-800 to-red-900 px-6 py-7 text-white">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="pointer-events-none absolute -right-6 -bottom-8 h-44 w-44 text-white/5"
          aria-hidden="true"
        >
          <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01z" />
        </svg>
        <div className="relative">
          <p className="text-sm font-medium text-amber-300 capitalize">
            {today}
          </p>
          <h1 className="mt-1 text-2xl font-bold">
            Xin chào, {user.name ?? user.email}
          </h1>
          <p className="mt-1.5 text-sm text-white/80">
            Quản trị nội dung trang tuyên truyền MTTQ xã Phong Hải ·{" "}
            <span className="font-semibold text-amber-300">
              {ROLE_LABELS[user.role] ?? user.role}
            </span>
          </p>
        </div>
      </header>

      {/* Thống kê */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard
          label="Bản nháp"
          value={stats.DRAFT}
          href="/admin/bai-viet?status=DRAFT"
          icon={ICONS.draft}
          tone="gray"
        />
        <StatCard
          label="Chờ duyệt"
          value={stats.PENDING}
          href="/admin/bai-viet?status=PENDING"
          icon={ICONS.clock}
          tone="amber"
        />
        <StatCard
          label="Đã đăng"
          value={stats.PUBLISHED}
          href="/admin/bai-viet?status=PUBLISHED"
          icon={ICONS.check}
          tone="green"
        />
        <StatCard
          label="Bị trả lại"
          value={stats.REJECTED}
          href="/admin/bai-viet?status=REJECTED"
          icon={ICONS.reject}
          tone="gray"
        />
        <StatCard
          label="Phản ánh mới"
          value={newFeedback}
          href="/admin/phan-anh?status=NEW"
          icon={ICONS.chat}
          tone={newFeedback > 0 ? "red" : "gray"}
        />
      </div>

      {/* Hành động nhanh */}
      <div className="flex flex-wrap gap-3">
        {canCreatePost(user) && (
          <Link
            href="/admin/bai-viet/moi"
            className="flex items-center gap-2 bg-red-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-800"
          >
            <Icon path={ICONS.plus} className="h-4 w-4" />
            Viết bài mới
          </Link>
        )}
        {isStaffReviewer && (
          <Link
            href="/admin/bai-viet?status=PENDING"
            className="flex items-center gap-2 border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800 transition hover:bg-amber-100"
          >
            <Icon path={ICONS.clock} className="h-4 w-4" />
            Duyệt bài chờ ({stats.PENDING})
          </Link>
        )}
        <Link
          href="/admin/phan-anh"
          className="flex items-center gap-2 border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <Icon path={ICONS.chat} className="h-4 w-4" />
          Phản ánh người dân
        </Link>
      </div>

      {/* Hai cột: phản ánh gần đây + bài chờ duyệt */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel
          title="Phản ánh gần đây"
          icon={ICONS.inbox}
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
          icon={ICONS.doc}
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
        <p className="border-l-4 border-amber-400 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Bạn là Biên tập viên — chỉ thấy bài của mình. Bài cần được Duyệt trước
          khi đăng công khai.
        </p>
      )}
    </div>
  );
}

const TONES: Record<string, string> = {
  gray: "bg-gray-100 text-gray-600",
  amber: "bg-amber-100 text-amber-700",
  green: "bg-green-100 text-green-700",
  red: "bg-red-100 text-red-700",
};

function StatCard({
  label,
  value,
  href,
  icon,
  tone,
}: {
  label: string;
  value: number;
  href: string;
  icon: string;
  tone: keyof typeof TONES | string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 border border-gray-200 bg-white p-4 transition hover:border-red-300 hover:shadow-sm"
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center ${
          TONES[tone] ?? TONES.gray
        }`}
      >
        <Icon path={icon} className="h-6 w-6" />
      </span>
      <div className="min-w-0">
        <p className="text-2xl leading-none font-bold text-gray-900">{value}</p>
        <p className="mt-1 text-xs text-gray-600">{label}</p>
      </div>
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
  icon,
  href,
  empty,
  rows,
}: {
  title: string;
  icon: string;
  href: string;
  empty: string;
  rows: Row[];
}) {
  return (
    <section className="flex flex-col border border-gray-200 bg-white">
      <div className="flex items-center justify-between bg-red-800 px-4 py-3">
        <h2 className="flex items-center gap-2 text-sm font-bold tracking-wide text-amber-300 uppercase">
          <Icon path={icon} className="h-4 w-4" />
          {title}
        </h2>
        <Link href={href} className="text-xs text-white/80 hover:text-white">
          Xem tất cả →
        </Link>
      </div>
      {rows.length === 0 ? (
        <p className="flex-1 px-4 py-10 text-center text-sm text-gray-400">
          {empty}
        </p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {rows.map((r) => (
            <li key={r.id}>
              <Link
                href={r.href}
                className="flex items-start justify-between gap-3 px-4 py-3 transition hover:bg-gray-50"
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
