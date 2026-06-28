"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-guards";
import { Role } from "@/generated/prisma/client";

// Bật/tắt "nổi bật" cho một bài (ADMIN hoặc APPROVER).
export async function toggleFeatured(formData: FormData) {
  await requireRole(Role.ADMIN, Role.APPROVER);
  const id = String(formData.get("id") ?? "");
  const featured = String(formData.get("featured") ?? "") === "true";
  if (!id) return;

  await prisma.post.update({ where: { id }, data: { featured } });

  revalidatePath("/admin/noi-bat");
  revalidatePath("/", "layout"); // khối nổi bật trang chủ
}
