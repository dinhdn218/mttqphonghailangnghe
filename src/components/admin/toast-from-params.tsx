"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { addToast } from "@heroui/react";

export type ParamToast = {
  // Tên query param cần theo dõi, ví dụ "deleted", "error", "saved".
  param: string;
  // Nếu có: chỉ bắn toast khi giá trị param KHỚP đúng chuỗi này (dùng cho
  // param kiểu mã lỗi, ví dụ error=self/lastadmin/hasposts). Bỏ trống thì
  // bắn toast hễ param có mặt (không quan tâm giá trị), ví dụ deleted=1.
  match?: string;
  message: string | ((value: string) => string);
  color: "success" | "danger" | "warning" | "default";
};

// Đọc query string lúc tải trang để bắn toast (thay cho banner tĩnh), rồi dọn
// param khỏi URL — tránh bắn lại toast khi bấm F5. Dùng cho các trang
// server-action redirect kèm cờ trạng thái (?deleted=1, ?error=..., ?saved=1).
export function ToastFromParams({ toasts }: { toasts: ParamToast[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const next = new URLSearchParams(searchParams.toString());
    let matched = false;

    for (const t of toasts) {
      const value = searchParams.get(t.param);
      if (value === null) continue;
      if (t.match !== undefined && value !== t.match) continue;

      addToast({
        title: typeof t.message === "function" ? t.message(value) : t.message,
        color: t.color,
      });
      next.delete(t.param);
      matched = true;
    }

    if (matched) {
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }
    // Chỉ đọc query string lúc mount (ngay sau khi server-action redirect tới) —
    // không phụ thuộc router/pathname/searchParams vì chúng đổi ngay trong effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
