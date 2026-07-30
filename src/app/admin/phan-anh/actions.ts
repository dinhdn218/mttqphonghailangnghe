"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth-guards";
import { FeedbackStatus } from "@/generated/prisma/client";

// Đổi trạng thái xử lý phản ánh (cán bộ đã đăng nhập).
export async function setFeedbackStatus(formData: FormData) {
  await requireUser();
  const id = String(formData.get("id") ?? "");
  const next = String(formData.get("status") ?? "");
  if (!id || !(next in FeedbackStatus)) redirect("/admin/phan-anh");

  await prisma.feedback.update({
    where: { id },
    data: { status: next as FeedbackStatus },
  });

  revalidatePath("/admin/phan-anh");
  revalidatePath(`/admin/phan-anh/${id}`);
  redirect(`/admin/phan-anh/${id}?updated=1`);
}

// Xoá phản ánh.
export async function deleteFeedback(formData: FormData) {
  await requireUser();
  const id = String(formData.get("id") ?? "");
  if (id) {
    await prisma.feedback.delete({ where: { id } });
  }
  revalidatePath("/admin/phan-anh");
  redirect("/admin/phan-anh?deleted=1");
}
