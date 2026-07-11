"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type User = { name: string | null; email: string; role: string };

type NavItem = {
  href: string;
  label: string;
  icon: string;
  exact?: boolean;
  adminOnly?: boolean;
  roles?: string[]; // chỉ hiện cho các vai này (nếu có)
};

const NAV: NavItem[] = [
  {
    href: "/admin",
    label: "Tổng quan",
    exact: true,
    icon: "M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z",
  },
  {
    href: "/admin/bai-viet",
    label: "Bài viết",
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
  },
  {
    href: "/admin/noi-bat",
    label: "Bài nổi bật",
    roles: ["ADMIN", "APPROVER"],
    icon: "M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z",
  },
  {
    href: "/admin/thu-vien",
    label: "Thư viện",
    icon: "m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z",
  },
  {
    href: "/admin/phan-anh",
    label: "Phản ánh",
    icon: "M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z",
  },
  {
    href: "/admin/nguoi-dung",
    label: "Người dùng",
    adminOnly: true,
    icon: "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z",
  },
  {
    href: "/admin/cau-hinh",
    label: "Cấu hình",
    adminOnly: true,
    icon: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.241.437-.613.43-.992a7.723 7.723 0 0 1 0-.255c.007-.378-.138-.75-.43-.991l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  },
];

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

// Sidebar khai báo ở CẤP MODULE (không lồng trong AdminShell) — nếu định nghĩa
// bên trong component cha, mỗi lần render sẽ tạo ra một component mới khiến React
// unmount/mount lại toàn bộ sidebar và mất state.
function Sidebar({
  items,
  badges,
  pathname,
  onNavigate,
}: {
  items: NavItem[];
  badges?: Record<string, number>;
  pathname: string;
  onNavigate?: () => void;
}) {
  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <div className="flex h-full flex-col">
      {/* Thương hiệu */}
      <Link
        href="/admin"
        onClick={onNavigate}
        className="flex items-center gap-2 border-b border-red-800 px-5 py-4"
      >
        <span className="flex h-8 w-8 items-center justify-center bg-amber-400 text-red-900">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01z" />
          </svg>
        </span>
        <span className="font-bold text-white">CMS · Phong Hải</span>
      </Link>

      {/* Điều hướng */}
      <nav className="flex-1 space-y-1 p-3">
        {items.map((item) => {
          const active = isActive(item);
          const badge = badges?.[item.href] ?? 0;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "border-l-4 border-amber-400 bg-red-800 pl-2 text-white"
                  : "text-red-100 hover:bg-red-800 hover:text-white"
              }`}
            >
              <Icon path={item.icon} />
              <span className="flex-1">{item.label}</span>
              {badge > 0 && (
                <span className="min-w-5 bg-amber-400 px-1.5 text-center text-xs font-bold text-red-900">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Về trang web */}
      <div className="border-t border-red-800 p-3">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-2 px-3 py-2 text-sm text-red-100 transition hover:text-amber-300"
        >
          ← Về trang web
        </Link>
      </div>
    </div>
  );
}

export function AdminShell({
  user,
  roleLabel,
  signOutAction,
  badges,
  children,
}: {
  user: User;
  roleLabel: string;
  signOutAction: () => Promise<void>;
  badges?: Record<string, number>;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = NAV.filter((item) => {
    if (item.adminOnly) return user.role === "ADMIN";
    if (item.roles) return item.roles.includes(user.role);
    return true;
  });

  return (
    <div className="flex min-h-dvh bg-gray-50">
      {/* Sidebar (desktop) — DÍNH theo màn hình: trang soạn bài rất dài, nếu
          sidebar cuộn mất thì phải cuộn ngược lên đầu mới bấm được menu.
          self-start để flex không kéo giãn, nhờ đó sticky mới có tác dụng. */}
      <aside className="hidden w-60 shrink-0 bg-red-900 lg:sticky lg:top-0 lg:block lg:h-dvh lg:self-start lg:overflow-y-auto">
        <Sidebar items={navItems} badges={badges} pathname={pathname} />
      </aside>

      {/* Drawer (mobile) */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Đóng menu"
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-64 bg-red-900 shadow-xl">
            <Sidebar
              items={navItems}
              badges={badges}
              pathname={pathname}
              onNavigate={() => setOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* Khu vực phải: header + nội dung */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Mở menu"
              onClick={() => setOpen(true)}
              className="border border-gray-300 p-1.5 text-gray-700 lg:hidden"
            >
              <Icon path="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </button>
            <span className="font-semibold text-red-800 lg:hidden">
              CMS · Phong Hải
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Link
              href="/admin/tai-khoan"
              className="hidden text-gray-600 hover:text-red-700 sm:inline"
              title="Tài khoản của tôi"
            >
              {user.name ?? user.email} ·{" "}
              <span className="font-medium text-red-800">{roleLabel}</span>
            </Link>
            <form action={signOutAction}>
              <button
                type="submit"
                className="border border-gray-300 px-3 py-1.5 text-sm font-medium transition hover:bg-gray-50"
              >
                Đăng xuất
              </button>
            </form>
          </div>
        </header>

        <main className="min-w-0 flex-1 p-4 sm:p-6">{children}</main>
      </div>

      <BackToTop />
    </div>
  );
}

// Nút lên đầu trang cho khu quản trị — kín đáo (không lắc/nhấp nháy như trang
// công khai). Hữu ích ở trang soạn bài và các danh sách dài.
function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Lên đầu trang"
      title="Lên đầu trang"
      className={`fixed right-5 bottom-5 z-40 flex h-10 w-10 items-center justify-center border border-gray-300 bg-white text-gray-600 shadow-md transition hover:border-red-300 hover:text-red-700 ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M4.5 15.75 12 8.25l7.5 7.5" />
      </svg>
    </button>
  );
}
