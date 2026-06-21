import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth-guards";
import { signOut } from "@/auth";
import { ROLE_LABELS } from "@/lib/constants";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  // Proxy đã chặn, nhưng kiểm tra lần nữa để chắc chắn có user cho UI.
  if (!user) redirect("/dang-nhap?callbackUrl=/admin");

  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-bold text-red-700">
              CMS · MTTQ Bắc Hà
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/admin" className="text-gray-700 hover:text-red-700">
                Tổng quan
              </Link>
              <Link
                href="/admin/bai-viet"
                className="text-gray-700 hover:text-red-700"
              >
                Bài viết
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-gray-600 sm:inline">
              {user.name ?? user.email} ·{" "}
              <span className="font-medium">
                {ROLE_LABELS[user.role] ?? user.role}
              </span>
            </span>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/dang-nhap" });
              }}
            >
              <button
                type="submit"
                className="rounded-lg border border-gray-300 px-3 py-1.5 font-medium transition hover:bg-gray-50"
              >
                Đăng xuất
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        {children}
      </main>
    </div>
  );
}
