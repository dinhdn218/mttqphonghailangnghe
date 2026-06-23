"use client";

import { CldUploadWidget } from "next-cloudinary";
import { recordMedia } from "@/app/admin/bai-viet/media-actions";

export type UploadResult = {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  resourceType: string;
};

type Props = {
  onUploaded: (result: UploadResult) => void;
  label?: string;
  resourceType?: "image" | "video" | "auto";
  className?: string;
};

const DEFAULT_CLASS =
  "rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50";

export function UploadButton({
  onUploaded,
  label,
  resourceType = "image",
  className,
}: Props) {
  return (
    <CldUploadWidget
      signatureEndpoint="/api/cloudinary/sign"
      options={{
        folder: "phonghailangnghe",
        sources: ["local", "url", "camera"],
        multiple: false,
        resourceType,
        maxFileSize: 15_000_000, // 15MB
      }}
      onSuccess={(result) => {
        const info = result?.info;
        if (!info || typeof info === "string") return;

        const r: UploadResult = {
          url: info.secure_url,
          publicId: info.public_id,
          width: info.width,
          height: info.height,
          resourceType: info.resource_type,
        };
        onUploaded(r);

        // Ghi nhận Media (không chặn UX nếu lỗi).
        recordMedia({
          url: r.url,
          publicId: r.publicId,
          type: r.resourceType === "video" ? "VIDEO" : "IMAGE",
          width: r.width,
          height: r.height,
        }).catch(() => {});
      }}
    >
      {({ open }) => (
        <button
          type="button"
          onClick={() => open()}
          className={className ?? DEFAULT_CLASS}
        >
          {label ?? "Tải lên"}
        </button>
      )}
    </CldUploadWidget>
  );
}
