import Link from "next/link";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth-guards";
import { Role } from "@/generated/prisma/client";
import { UserForm } from "../user-form";

export default async function NewUserPage() {
  const current = await requireUser();
  if (current.role !== Role.ADMIN) redirect("/admin");

  return (
    <div className="space-y-4">
      <Link
        href="/admin/nguoi-dung"
        className="text-sm text-gray-500 hover:text-red-700"
      >
        ← Người dùng
      </Link>
      <h1 className="text-2xl font-bold">Thêm người dùng</h1>
      <UserForm />
    </div>
  );
}
