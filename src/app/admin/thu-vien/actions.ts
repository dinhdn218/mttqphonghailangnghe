"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth-guards";
import { cloudinary } from "@/lib/cloudinary";

// Xoá media: xoá trên Cloudinary trước, rồi xoá bản ghi DB.
export async function deleteMedia(formData: FormData) {
  await requireUser();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) return;

  try {
    await cloudinary.uploader.destroy(media.publicId, {
      resource_type: media.type === "VIDEO" ? "video" : "image",
    });
  } catch (e) {
    // Không chặn xoá DB nếu Cloudinary lỗi (vd đã xoá thủ công).
    console.error("Xoá Cloudinary lỗi:", e);
  }

  await prisma.media.delete({ where: { id } });
  revalidatePath("/admin/thu-vien");
}
