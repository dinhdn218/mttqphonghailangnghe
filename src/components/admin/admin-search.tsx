import Link from "next/link";

// Ô tìm kiếm dùng chung cho các trang danh sách admin.
// GET-form: submit là điều hướng kèm ?q=… + giữ nguyên các filter (params),
// đồng thời reset về trang 1 (không kèm page). Không cần JS.
export function AdminSearch({
  basePath,
  params,
  defaultValue,
  placeholder = "Tìm kiếm…",
}: {
  basePath: string;
  params?: Record<string, string | undefined>;
  defaultValue?: string;
  placeholder?: string;
}) {
  const preserved = Object.entries(params ?? {}).filter(
    (e): e is [string, string] => Boolean(e[1]),
  );

  const clearSp = new URLSearchParams();
  for (const [k, v] of preserved) clearSp.set(k, v);
  const clearHref = clearSp.toString() ? `${basePath}?${clearSp}` : basePath;

  return (
    <form action={basePath} method="get" className="flex items-center gap-2">
      {preserved.map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      <div className="relative flex-1 sm:flex-none">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-gray-400"
          aria-hidden="true"
        >
          <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input
          type="search"
          name="q"
          defaultValue={defaultValue}
          placeholder={placeholder}
          aria-label={placeholder}
          className="w-full border border-gray-300 bg-white py-2 pr-3 pl-8 text-sm outline-none transition focus:border-red-600 focus:ring-1 focus:ring-red-600 sm:w-64"
        />
      </div>
      <button
        type="submit"
        className="bg-red-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-800"
      >
        Tìm
      </button>
      {defaultValue ? (
        <Link
          href={clearHref}
          className="px-2 py-2 text-sm text-gray-500 hover:text-red-700"
        >
          Xóa
        </Link>
      ) : null}
    </form>
  );
}
