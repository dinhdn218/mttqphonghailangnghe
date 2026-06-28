import { requireUser } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { ROLE_LABELS } from "@/lib/constants";
import { ProfileForm } from "./profile-form";

export default async function AccountPage() {
  const sessionUser = await requireUser();
  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    select: { name: true, email: true, role: true },
  });

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Tài khoản của tôi</h1>
        <p className="mt-1 text-sm text-gray-500">
          {user?.email} · {ROLE_LABELS[user?.role ?? ""] ?? user?.role}
        </p>
      </div>
      <ProfileForm name={user?.name ?? ""} />
    </div>
  );
}
