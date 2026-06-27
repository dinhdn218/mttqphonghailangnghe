import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { Role } from "@/generated/prisma/client";
import { UserForm } from "../user-form";

type Props = { params: Promise<{ id: string }> };

export default async function EditUserPage({ params }: Props) {
  const current = await requireUser();
  if (current.role !== Role.ADMIN) redirect("/admin");

  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true },
  });
  if (!user) notFound();

  return (
    <div className="space-y-4">
      <Link
        href="/admin/nguoi-dung"
        className="text-sm text-gray-500 hover:text-red-700"
      >
        ← Người dùng
      </Link>
      <h1 className="text-2xl font-bold">Sửa người dùng</h1>
      <UserForm user={user} />
    </div>
  );
}
