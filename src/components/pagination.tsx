import { Link } from "@/i18n/navigation";

// Phân trang đơn giản: Trước · các số trang · Sau. Giữ locale qua next-intl Link.
export function Pagination({
  basePath,
  currentPage,
  totalPages,
  prevLabel,
  nextLabel,
}: {
  basePath: string;
  currentPage: number;
  totalPages: number;
  prevLabel: string;
  nextLabel: string;
}) {
  if (totalPages <= 1) return null;

  const href = (p: number) => (p <= 1 ? basePath : `${basePath}?page=${p}`);

  // Cửa sổ số trang quanh trang hiện tại.
  const pages: number[] = [];
  const from = Math.max(1, currentPage - 2);
  const to = Math.min(totalPages, currentPage + 2);
  for (let i = from; i <= to; i++) pages.push(i);

  return (
    <nav className="mt-8 flex items-center justify-center gap-1 text-sm">
      {currentPage > 1 && (
        <Link
          href={href(currentPage - 1)}
          className="rounded-lg border border-gray-300 px-3 py-1.5 hover:bg-gray-50"
        >
          ← {prevLabel}
        </Link>
      )}

      {from > 1 && <span className="px-1 text-gray-400">…</span>}

      {pages.map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === currentPage ? "page" : undefined}
          className={`rounded-lg px-3 py-1.5 ${
            p === currentPage
              ? "bg-red-700 text-white"
              : "border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {p}
        </Link>
      ))}

      {to < totalPages && <span className="px-1 text-gray-400">…</span>}

      {currentPage < totalPages && (
        <Link
          href={href(currentPage + 1)}
          className="rounded-lg border border-gray-300 px-3 py-1.5 hover:bg-gray-50"
        >
          {nextLabel} →
        </Link>
      )}
    </nav>
  );
}
