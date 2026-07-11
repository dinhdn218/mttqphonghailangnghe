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

  // Khối nổi bật: 1 hero + 2 thẻ + đổ dư tin cho hộp "Tin tiêu điểm" (cắt gọn lấp đầy chiều cao).
  // Lấy SONG SONG bài nổi bật + danh sách chuyên mục (trước đây chờ lần lượt).
  const [featured, categories] = await Promise.all([
    getFeaturedPosts(13),
    getCategoriesOrdered(),
  ]);
  const sections = await Promise.all(
    categories.map(async (category) => ({
      category,
      // 2 tin có ảnh song song + tối đa 4 tin dạng text
      posts: await getLatestByCategory(category.id, 6),
    })),
  );

  return (
    <main className="mx-auto w-full max-w-container px-4 py-8">
      <FeaturedSection posts={featured} locale={loc} />

      {/* Vạch hoa văn (thổ cẩm) */}
      <div className="h-1.5 w-full my-8 bg-[repeating-linear-gradient(45deg,#f59e0b_0,#f59e0b_8px,#7f1d1d_8px,#7f1d1d_16px)]" />

      <div className="grid gap-x-10 gap-y-10 lg:grid-cols-2">
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
