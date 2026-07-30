"use client";

import { CldUploadWidget } from "next-cloudinary";
import { addToast } from "@heroui/react";
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

// Widget Cloudinary khoá cuộn trang khi mở. Nếu nó đóng bất thường (hoặc bị
// unmount giữa chừng) thì khoá cuộn còn sót lại → trang "đơ", không cuộn được.
// Hàm này trả lại trạng thái cuộn cho chắc.
function releaseScrollLock() {
  if (typeof document === "undefined") return;
  document.body.style.removeProperty("overflow");
  document.documentElement.style.removeProperty("overflow");
}

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
      onClose={releaseScrollLock}
      onError={(error) => {
        console.error("Tải lên Cloudinary lỗi:", error);
        addToast({ title: "Tải ảnh lên thất bại. Vui lòng thử lại.", color: "danger" });
      }}
      onSuccess={(result, { widget }) => {
        const info = result?.info;
        if (!info || typeof info === "string") return;

        const r: UploadResult = {
          url: info.secure_url,
          publicId: info.public_id,
          width: info.width,
          height: info.height,
          resourceType: info.resource_type,
        };

        // ĐÓNG WIDGET TRƯỚC khi báo kết quả lên cha: onUploaded thường đổi state
        // ở cha và có thể unmount widget này — nếu widget chưa đóng, overlay và
        // khoá cuộn của Cloudinary sẽ kẹt lại làm trang không thao tác được.
        try {
          widget?.close();
        } catch {
          /* bỏ qua */
        }
        releaseScrollLock();

        onUploaded(r);
        addToast({ title: "Đã tải ảnh lên.", color: "success" });

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
