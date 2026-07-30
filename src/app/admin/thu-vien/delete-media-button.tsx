"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/react";
import { deleteMedia } from "./actions";

// Xoá media: gọi thẳng server action (không qua <form>) để có thể bắt lỗi và
// báo toast tại chỗ, thay vì chỉ trông chờ revalidatePath làm mất hàng lặng lẽ.
export function DeleteMediaButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onDelete = () => {
    startTransition(async () => {
      try {
        const fd = new FormData();
        fd.set("id", id);
        await deleteMedia(fd);
        addToast({ title: "Đã xoá.", color: "success" });
        router.refresh();
      } catch (e) {
        console.error("Xoá media lỗi:", e);
        addToast({ title: "Không xoá được. Vui lòng thử lại.", color: "danger" });
      }
    });
  };

  return (
    <button
      type="button"
      onClick={onDelete}
      disabled={pending}
      className="text-gray-400 hover:text-red-600 disabled:opacity-50"
    >
      {pending ? "Đang xoá…" : "Xoá"}
    </button>
  );
}
