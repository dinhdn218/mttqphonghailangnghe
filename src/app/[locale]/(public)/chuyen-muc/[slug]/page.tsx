import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getCategoryBySlug, getPublishedPostsByCategory } from "@/lib/posts";
import { CategoryFeatured } from "@/components/category/category-featured";
import { CategoryEmpty } from "@/components/category/category-empty";
import { PostListItem } from "@/components/post-list-item";
import { Pagination } from "@/components/pagination";
import { pick } from "@/lib/i18n";
import { CATEGORIES, type Locale } from "@/lib/constants";

// Chuyên mục gợi ý khi chuyên mục đang xem chưa có bài (mục đầu = Tin tức – Sự kiện).
const NEWS_SLUG = CATEGORIES[0].slug;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "404" };
  return {
    title: pick(category.nameVi, category.nameEn, locale as Locale),
    description: category.descVi
      ? pick(category.descVi, category.descEn, locale as Locale)
      : undefined,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { locale, slug } = await params;
  const { page: pageParam } = await searchParams;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations();

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const page = Math.max(1, Number(pageParam) || 1);
  const { posts, totalPages } = await getPublishedPostsByCategory(
    category.id,
    page,
  );
  const name = pick(category.nameVi, category.nameEn, loc);
  const desc = category.descVi
    ? pick(category.descVi, category.descEn, loc)
    : null;

  // Trang 1: 3 bài đầu lên khối nổi bật bento, phần còn lại xuống danh sách.
  // Các trang sau: tất cả đều ở danh sách.
  const showFeatured = page === 1 && posts.length >= 3;
  const big = showFeatured ? posts[0] : null;
  const small = showFeatured ? posts.slice(1, 3) : [];
  const listPosts = showFeatured ? posts.slice(3) : posts;

  return (
    <main className="mx-auto flex w-full max-w-container flex-col gap-8 px-4 py-8">
      {/* Header: tiêu đề + mô tả */}
      <header className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-red-700 sm:text-3xl">{name}</h1>
        <p className="mt-2 text-gray-600">
          {desc ??
            t("category.descFallback", {
              // Tiếng Việt viết thường tên chuyên mục cho xuôi câu; tiếng Anh giữ
              // nguyên vì tên chuyên mục là danh từ riêng dạng Title Case.
              name: loc === "vi" ? name.toLowerCase() : name,
            })}
        </p>
      </header>

      {posts.length === 0 ? (
        <CategoryEmpty
          title={t("category.empty")}
          hint={t("category.emptyHint")}
          homeLabel={t("category.emptyHome")}
          browseLabel={t("category.emptyBrowse")}
          // Đang ở chính chuyên mục tin tức thì không gợi ý quay lại chính nó.
          browseHref={
            slug === NEWS_SLUG ? undefined : `/chuyen-muc/${NEWS_SLUG}`
          }
        />
      ) : (
        <>
          {/* Khối nổi bật bento (chỉ trang 1) */}
          {big && (
            <CategoryFeatured
              big={big}
              small={small}
              locale={loc}
              featuredLabel={t("home.featured")}
            />
          )}

          {/* Đường phân cách thổ cẩm */}
          {big && listPosts.length > 0 && (
            <div className="h-1.5 w-full bg-[repeating-linear-gradient(45deg,#f59e0b_0,#f59e0b_8px,#7f1d1d_8px,#7f1d1d_16px)]" />
          )}

          {/* Danh sách tin */}
          {listPosts.length > 0 && (
            <section>
              <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-gray-900">
                <span className="h-6 w-1 bg-red-700" />
                {t("category.latest")}
              </h2>
              <div className="flex flex-col gap-4">
                {listPosts.map((post) => (
                  <PostListItem key={post.id} post={post} locale={loc} />
                ))}
              </div>
            </section>
          )}

          <Pagination
            basePath={`/chuyen-muc/${slug}`}
            currentPage={page}
            totalPages={totalPages}
          />
        </>
      )}
    </main>
  );
}
