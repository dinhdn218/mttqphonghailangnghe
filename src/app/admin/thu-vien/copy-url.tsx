"use client";

import { useState } from "react";

// Nút sao chép URL media vào clipboard.
export function CopyUrl({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* clipboard bị chặn — bỏ qua */
        }
      }}
      className="text-gray-500 hover:text-red-700"
    >
      {copied ? "Đã chép ✓" : "Sao chép URL"}
    </button>
  );
}
