import { setRequestLocale } from "next-intl/server";
import {
  getFeaturedPosts,
  getCategoriesOrdered,
  getLatestByCategory,
} from "@/lib/posts";
import { type Locale } from "@/lib/constants";
import { FeaturedSection } from "@/components/home/featured-section";
import { CategorySection } from "@/components/home/category-section";

type Props = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;

  // Khối nổi bật (8 bài: 1 hero + 2 cột trái + 5 cột phải) + mỗi chuyên mục 5 bài.
  const featured = await getFeaturedPosts(8);
  const categories = await getCategoriesOrdered();
  const sections = await Promise.all(
    categories.map(async (category) => ({
      category,
      posts: await getLatestByCategory(category.id, 5),
    })),
  );

  return (
    <main className="mx-auto w-full max-w-container px-4 py-8">
      <FeaturedSection posts={featured} locale={loc} />

      <div className="grid gap-x-8 gap-y-8 lg:grid-cols-2">
        {sections.map(
          ({ category, posts }) =>
            posts.length > 0 && (
              <CategorySection
                key={category.id}
                category={category}
                posts={posts}
                locale={loc}
              />
            ),
        )}
      </div>
    </main>
  );
}
