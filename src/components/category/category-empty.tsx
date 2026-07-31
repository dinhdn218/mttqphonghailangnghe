import { Link } from "@/i18n/navigation";

// Trạng thái rỗng của trang chuyên mục. Chuyên mục chưa có bài là chuyện bình
// thường lúc mới bàn giao (khách tự nhập nội dung), nên trang vẫn phải "ra dáng"
// chứ không để trơ một dòng chữ xám.
export function CategoryEmpty({
  title,
  hint,
  homeLabel,
  browseLabel,
  browseHref,
}: {
  title: string;
  hint: string;
  homeLabel: string;
  browseLabel: string;
  /** Chuyên mục gợi ý xem tiếp; bỏ trống khi đang đứng ở chính chuyên mục đó. */
  browseHref?: string;
}) {
  return (
    <section className="border border-gray-200 bg-white shadow-sm">
      {/* Dải thổ cẩm trên đầu — mô-típ dùng chung toàn site */}
      <div className="h-1.5 w-full bg-[repeating-linear-gradient(45deg,#f59e0b_0,#f59e0b_8px,#7f1d1d_8px,#7f1d1d_16px)]" />

      <div className="flex flex-col items-center px-6 py-14 text-center sm:py-16">
        {/* Ảnh minh hoạ: chồng lớp cho có chiều sâu, tránh cảm giác trang lỗi */}
        <div className="relative mb-7">
          <div
            aria-hidden
            className="absolute inset-0 -rotate-6 rounded-xl border-2 border-dashed border-red-200"
          />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-xl border border-red-100 bg-red-50">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-11 w-11 text-red-700"
              aria-hidden
            >
              {/* Chồng tài liệu + dấu cộng: "sắp có bài mới" */}
              <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h7L17 8.5v5" />
              <path d="M12.5 4v4.5H17" />
              <path d="M4 5.5v13A1.5 1.5 0 0 0 5.5 20h5" />
              <circle cx="17" cy="17.5" r="3.5" />
              <path d="M17 16v3M15.5 17.5h3" />
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="mt-2.5 max-w-md text-[15px] leading-relaxed text-gray-600">
          {hint}
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="bg-red-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-800"
          >
            {homeLabel}
          </Link>
          {browseHref && (
            <Link
              href={browseHref}
              className="border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-red-700 hover:text-red-700"
            >
              {browseLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
