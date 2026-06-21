"use server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth-guards";
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
