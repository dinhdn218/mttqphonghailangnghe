import { Link } from "@/i18n/navigation";

// Phân trang kiểu nút vuông: ‹ · các số trang · › . Giữ locale qua next-intl Link.
export function Pagination({
  basePath,
  currentPage,
  totalPages,
}: {
  basePath: string;
  currentPage: number;
  totalPages: number;
  // Giữ tương thích chữ ký cũ (không còn dùng nhãn chữ).
  prevLabel?: string;
  nextLabel?: string;
}) {
  if (totalPages <= 1) return null;

  const href = (p: number) => (p <= 1 ? basePath : `${basePath}?page=${p}`);

  // Cửa sổ số trang quanh trang hiện tại.
  const pages: number[] = [];
  const from = Math.max(1, currentPage - 2);
  const to = Math.min(totalPages, currentPage + 2);
  for (let i = from; i <= to; i++) pages.push(i);

  const cell =
    "flex h-10 w-10 items-center justify-center border text-sm font-medium transition";

  return (
    <nav className="mt-8 flex items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link
          href={href(currentPage - 1)}
          aria-label="Trang trước"
          className={`${cell} border-gray-300 text-gray-700 hover:bg-gray-100`}
        >
          ‹
        </Link>
      )}

      {from > 1 && (
        <>
          <Link
            href={href(1)}
            className={`${cell} border-gray-300 text-gray-700 hover:bg-gray-100`}
          >
            1
          </Link>
          <span className="flex h-10 w-10 items-center justify-center text-gray-400">
            …
          </span>
        </>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === currentPage ? "page" : undefined}
          className={`${cell} ${
            p === currentPage
              ? "border-red-700 bg-red-700 text-white"
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          {p}
        </Link>
      ))}

      {to < totalPages && (
        <>
          <span className="flex h-10 w-10 items-center justify-center text-gray-400">
            …
          </span>
          <Link
            href={href(totalPages)}
            className={`${cell} border-gray-300 text-gray-700 hover:bg-gray-100`}
          >
            {totalPages}
          </Link>
        </>
      )}

      {currentPage < totalPages && (
        <Link
          href={href(currentPage + 1)}
          aria-label="Trang sau"
          className={`${cell} border-gray-300 text-gray-700 hover:bg-gray-100`}
        >
          ›
        </Link>
      )}
    </nav>
  );
}
