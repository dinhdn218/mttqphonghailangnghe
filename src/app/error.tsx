"use client";

import Link from "next/link";
import { useEffect } from "react";

// Bắt lỗi runtime để người dân không thấy màn hình lỗi kỹ thuật của Next.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Lỗi không mong muốn:", error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-container flex-col items-center justify-center px-4 py-16 text-center">
      <div className="h-1.5 w-40 bg-[repeating-linear-gradient(45deg,#f59e0b_0,#f59e0b_8px,#7f1d1d_8px,#7f1d1d_16px)]" />
      <h1 className="mt-6 text-2xl font-bold text-red-800">
        Đã xảy ra lỗi
      </h1>
      <p className="mt-2 max-w-md text-gray-600">
        Rất tiếc, trang gặp sự cố khi hiển thị. Vui lòng thử lại; nếu vẫn lỗi,
        xin liên hệ với chúng tôi qua đường dây nóng.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="bg-red-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-800"
        >
          Thử lại
        </button>
        <Link
          href="/"
          className="border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Về trang chủ
        </Link>
      </div>
      {error.digest && (
        <p className="mt-6 text-xs text-gray-400">Mã lỗi: {error.digest}</p>
      )}
    </main>
  );
}
