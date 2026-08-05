"use server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth-guards";
import { cloudinary } from "@/lib/cloudinary";
import { MediaType } from "@/generated/prisma/client";

type RecordMediaInput = {
  url: string;
  publicId: string;
  type: "IMAGE" | "VIDEO" | "INFOGRAPHIC";
  width?: number;
  height?: number;
  alt?: string;
};

// Lưu vết media đã upload lên Cloudinary (phục vụ thư viện + dọn dẹp sau này).
export async function recordMedia(input: RecordMediaInput) {
  const user = await requireUser();
  await prisma.media.create({
    data: {
      url: input.url,
      publicId: input.publicId,
      type: input.type as MediaType,
      width: input.width,
      height: input.height,
      alt: input.alt,
      uploadedById: user.id,
    },
  });
}

export type RehostResult =
  | { ok: true; url: string; publicId: string; width?: number; height?: number }
  | { ok: false };

// Ảnh dán vào bài viết từ trang ngoài (vd. copy nguyên bài Facebook) thường trỏ
// tới CDN chặn hotlink (fbcdn.net...) và sẽ vỡ khi hiển thị trên site. Hàm này
// tải lại ảnh đó lên Cloudinary của mình để ảnh luôn hiển thị được lâu dài.
export async function rehostImageFromUrl(url: string): Promise<RehostResult> {
  const user = await requireUser();

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return { ok: false };
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { ok: false };
  }
  // Đã ở Cloudinary của mình rồi thì khỏi tải lại.
  if (parsed.hostname === "res.cloudinary.com") {
    return { ok: false };
  }

  try {
    const result = await cloudinary.uploader.upload(url, {
      folder: "phonghailangnghe",
      resource_type: "image",
    });
    await prisma.media.create({
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        type: MediaType.IMAGE,
        width: result.width,
        height: result.height,
        uploadedById: user.id,
      },
    });
    return {
      ok: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    // Nguồn ngoài có thể chặn hotlink/đã xoá ảnh — đây là lỗi mong đợi, không phải lỗi hệ thống.
    console.warn("Không tải lại được ảnh ngoài:", url, error);
    return { ok: false };
  }
}
