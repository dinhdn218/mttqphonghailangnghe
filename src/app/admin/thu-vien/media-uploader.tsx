"use client";

import { useRouter } from "next/navigation";
import { UploadButton } from "@/components/editor/upload-button";

// Nút tải media lên thư viện; tải xong thì refresh để hiện ngay.
export function MediaUploader() {
  const router = useRouter();
  return (
    <UploadButton
      label="+ Tải media lên"
      resourceType="auto"
      onUploaded={() => router.refresh()}
      className="bg-red-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-800"
    />
  );
}
