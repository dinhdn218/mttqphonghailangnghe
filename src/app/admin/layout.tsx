import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth-guards";
import { signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ROLE_LABELS } from "@/lib/constants";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  // Proxy đã chặn, nhưng kiểm tra lần nữa để chắc chắn có user cho UI.
  if (!user) redirect("/dang-nhap?callbackUrl=/admin");

  async function doSignOut() {
    "use server";
    await signOut({ redirectTo: "/dang-nhap" });
  }

  // Số phản ánh chưa xử lý → hiển thị badge trên menu.
  const newFeedback = await prisma.feedback
    .count({ where: { status: "NEW" } })
    .catch(() => 0);

  return (
    <AdminShell
      user={{
        name: user.name ?? null,
        email: user.email ?? "",
        role: user.role,
      }}
      roleLabel={ROLE_LABELS[user.role] ?? user.role}
      signOutAction={doSignOut}
      badges={{ "/admin/phan-anh": newFeedback }}
    >
      {children}
    </AdminShell>
  );
}
