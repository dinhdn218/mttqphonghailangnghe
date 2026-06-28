"use client";

import { useRouter } from "next/navigation";

type StatusOption = { value: string; label: string };
type CategoryOption = { slug: string; nameVi: string };

// Bộ lọc danh sách bài: tab trạng thái + select chuyên mục.
// Đổi 1 tiêu chí thì giữ tiêu chí kia, đồng thời reset về trang 1.
export function PostFilters({
  statuses,
  categories,
  status,
  category,
  q,
}: {
  statuses: StatusOption[];
  categories: CategoryOption[];
  status?: string;
  category?: string;
  q?: string;
}) {
  const router = useRouter();

  const go = (next: { status?: string; category?: string }) => {
    const s = "status" in next ? next.status : status;
    const c = "category" in next ? next.category : category;
    const params = new URLSearchParams();
    if (s) params.set("status", s);
    if (c) params.set("category", c);
    if (q) params.set("q", q);
    const qs = params.toString();
    router.push(qs ? `/admin/bai-viet?${qs}` : "/admin/bai-viet");
  };

  const tab = (active: boolean) =>
    `px-3 py-1.5 text-sm font-medium transition ${
      active
        ? "bg-red-700 text-white"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {/* Trạng thái */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={tab(!status)}
          onClick={() => go({ status: undefined })}
        >
          Tất cả
        </button>
        {statuses.map((s) => (
          <button
            key={s.value}
            type="button"
            className={tab(status === s.value)}
            onClick={() => go({ status: s.value })}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Chuyên mục */}
      <select
        value={category ?? ""}
        onChange={(e) => go({ category: e.target.value || undefined })}
        className="border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
      >
        <option value="">Tất cả chuyên mục</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.nameVi}
          </option>
        ))}
      </select>
    </div>
  );
}
