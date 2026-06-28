import Link from "next/link";

// Phân trang dùng chung cho mọi trang danh sách admin: dòng tổng số bên trái +
// phân trang đánh số đầy đủ bên phải (‹ 1 … 4 5 6 … N ›). Giữ nguyên bộ lọc qua `params`.
export function AdminPagination({
  page,
  totalPages,
  basePath,
  summary,
  params,
}: {
  page: number;
  totalPages: number;
  basePath: string;
  summary: string; // vd "80 bài" — sẽ hiển thị "80 bài · trang 1/4"
  params?: Record<string, string | undefined>;
}) {
  const hrefFor = (p: number) => {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(params ?? {})) {
      if (v) sp.set(k, v);
    }
    if (p > 1) sp.set("page", String(p));
    const qs = sp.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => Math.abs(p - page) <= 2 || p === 1 || p === totalPages,
  );

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-500">
      <span>
        {summary} · trang {page}/{totalPages}
      </span>
      {totalPages > 1 && (
        <nav className="flex items-center gap-1">
          <PageLink href={hrefFor(page - 1)} disabled={page <= 1}>
            ‹
          </PageLink>
          {pages.map((p, idx, arr) => (
            <span key={p} className="flex items-center gap-1">
              {idx > 0 && p - arr[idx - 1] > 1 && (
                <span className="px-1 text-gray-400">…</span>
              )}
              <PageLink href={hrefFor(p)} active={p === page}>
                {p}
              </PageLink>
            </span>
          ))}
          <PageLink href={hrefFor(page + 1)} disabled={page >= totalPages}>
            ›
          </PageLink>
        </nav>
      )}
    </div>
  );
}

// Ô phân trang vuông; vô hiệu hoá thì render span thay vì link.
function PageLink({
  href,
  active,
  disabled,
  children,
}: {
  href: string;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const base =
    "flex h-9 min-w-9 items-center justify-center border px-2 text-sm font-medium";
  if (disabled) {
    return (
      <span className={`${base} border-gray-200 text-gray-300`}>{children}</span>
    );
  }
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`${base} ${
        active
          ? "border-red-700 bg-red-700 text-white"
          : "border-gray-300 text-gray-700 hover:bg-gray-100"
      }`}
    >
      {children}
    </Link>
  );
}
