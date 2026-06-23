import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getCategoryBySlug, getPublishedPostsByCategory } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { Pagination } from "@/components/pagination";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/lib/constants";

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
  const t = await getTranslations();

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const page = Math.max(1, Number(pageParam) || 1);
  const { posts, totalPages } = await getPublishedPostsByCategory(
    category.id,
    page,
  );
  const name = pick(category.nameVi, category.nameEn, locale as Locale);
  const desc = category.descVi
    ? pick(category.descVi, category.descEn, locale as Locale)
    : null;

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">{name}</h1>
        {desc && <p className="mt-1 text-gray-600">{desc}</p>}
      </header>

      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} locale={locale as Locale} />
            ))}
          </div>
          <Pagination
            basePath={`/chuyen-muc/${slug}`}
            currentPage={page}
            totalPages={totalPages}
            prevLabel={t("pagination.prev")}
            nextLabel={t("pagination.next")}
          />
        </>
      ) : (
        <p className="text-gray-500">{t("category.empty")}</p>
      )}
    </main>
  );
}
