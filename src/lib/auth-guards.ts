import { auth } from "@/auth";
import type { Role } from "@/generated/prisma/client";

// Tiện ích phân quyền dùng trong server component / server action / route handler.
// Quy ước vai: ADMIN > APPROVER (duyệt) > EDITOR (biên tập).

export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}

// Trả về user nếu đã đăng nhập, ngược lại ném lỗi (gọi kèm redirect ở UI nếu cần).
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHENTICATED");
  return user;
}

// Yêu cầu user có một trong các vai cho phép.
export async function requireRole(...roles: Role[]) {
  const user = await requireUser();
  if (!roles.includes(user.role)) throw new Error("FORBIDDEN");
  return user;
}

export function can(user: { role: Role } | null, ...roles: Role[]) {
  return !!user && roles.includes(user.role);
}
