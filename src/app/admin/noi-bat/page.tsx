import Link from "next/link";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { Role, PostStatus } from "@/generated/prisma/client";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { AdminSearch } from "@/components/admin/admin-search";
import { toggleFeatured } from "./actions";

const PAGE_SIZE = 20;
// Số bài nổi bật tối đa hiển thị ở khối đầu trang chủ (khớp getFeaturedPosts).
const HOME_SLOTS = 13;

type Props = {
  searchParams: Promise<{ featured?: string; q?: string; page?: string }>;
};

export default async function FeaturedAdminPage({ searchParams }: Props) {
  const user = await requireUser();
  if (user.role !== Role.ADMIN && user.role !== Role.APPROVER) {
    redirect("/admin");
  }

  const sp = await searchParams;
  const onlyFeatured = sp.featured === "1";
  const q = sp.q?.trim() || undefined;
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);

  const where = {
    status: PostStatus.PUBLISHED,
    ...(onlyFeatured ? { featured: true } : {}),
    ...(q
      ? {
          OR: [
            { titleVi: { contains: q, mode: "insensitive" as const } },
            { titleEn: { contains: q, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const tabHref = (featuredOnly: boolean) => {
    const params = new URLSearchParams();
    if (featuredOnly) params.set("featured", "1");
    if (q) params.set("q", q);
    const qs = params.toString();
    return qs ? `/admin/noi-bat?${qs}` : "/admin/noi-bat";
  };

  const [posts, total, featuredCount] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: { category: { select: { nameVi: true } } },
    }),
    prisma.post.count({ where }),
    prisma.post.count({
      where: { status: PostStatus.PUBLISHED, featured: true },
    }),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Bài nổi bật</h1>
        <p className="mt-1 text-sm text-gray-500">
          Bật ⭐ để đưa bài lên khối đầu trang chủ. Trang chủ hiển thị tối đa{" "}
          {HOME_SLOTS} bài nổi bật (mới nhất trước); còn trống thì tự lấp bằng
          bài mới nhất.
        </p>
      </div>

      <AdminSearch
        basePath="/admin/noi-bat"
        params={{ featured: onlyFeatured ? "1" : undefined }}
        defaultValue={q}
        placeholder="Tìm theo tiêu đề…"
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2 text-sm">
          <Link
            href={tabHref(false)}
            className={`px-3 py-1.5 font-medium transition ${
              !onlyFeatured
                ? "bg-red-700 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Tất cả đã đăng
          </Link>
          <Link
            href={tabHref(true)}
            className={`px-3 py-1.5 font-medium transition ${
              onlyFeatured
                ? "bg-red-700 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Đang nổi bật
          </Link>
        </div>
        <span
          className={`px-3 py-1 text-sm font-medium ${
            featuredCount > HOME_SLOTS
              ? "bg-amber-100 text-amber-800"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {featuredCount} bài đang nổi bật
        </span>
      </div>

      <div className="overflow-hidden border border-gray-200">
        {posts.length === 0 ? (
          <p className="p-6 text-center text-gray-500">Không có bài phù hợp.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="w-22 px-4 py-2 text-center font-medium">
                  Nổi bật
                </th>
                <th className="px-4 py-2 font-medium">Tiêu đề</th>
                <th className="hidden px-4 py-2 font-medium sm:table-cell">
                  Chuyên mục
                </th>
                <th className="hidden px-4 py-2 font-medium md:table-cell">
                  Đăng lúc
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-center">
                    <form action={toggleFeatured}>
                      <input type="hidden" name="id" value={p.id} />
                      <input
                        type="hidden"
                        name="featured"
                        value={(!p.featured).toString()}
                      />
                      <button
                        type="submit"
                        aria-label={p.featured ? "Bỏ nổi bật" : "Đặt nổi bật"}
                        title={p.featured ? "Bỏ nổi bật" : "Đặt nổi bật"}
                        className={`text-xl leading-none transition ${
                          p.featured
                            ? "text-amber-500 hover:text-gray-300"
                            : "text-gray-300 hover:text-amber-500"
                        }`}
                      >
                        {p.featured ? "★" : "☆"}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/bai-viet/${p.id}`}
                      className="font-medium text-gray-900 hover:text-red-700"
                    >
                      {p.titleVi}
                    </Link>
                  </td>
                  <td className="hidden px-4 py-3 text-gray-600 sm:table-cell">
                    {p.category.nameVi}
                  </td>
                  <td className="hidden px-4 py-3 whitespace-nowrap text-gray-500 md:table-cell">
                    {p.publishedAt ? formatDate(p.publishedAt) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AdminPagination
        page={page}
        totalPages={totalPages}
        basePath="/admin/noi-bat"
        summary={`${total} bài`}
        params={{ featured: onlyFeatured ? "1" : undefined, q }}
      />
    </div>
  );
}
