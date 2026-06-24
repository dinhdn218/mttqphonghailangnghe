import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/lib/constants";
import type { HomePost } from "./types";
import { ArticleFeature } from "./article-feature";
import { ArticleThumbItem } from "./article-thumb-item";

type Category = { slug: string; nameVi: string; nameEn: string | null };

// Khối một chuyên mục: tiêu đề chuyên mục + 1 bài lớn + 4 bài nhỏ (5 bài mới nhất).
export function CategorySection({
  category,
  posts,
  locale,
}: {
  category: Category;
  posts: HomePost[];
  locale: Locale;
}) {
  if (posts.length === 0) return null;
  const [main, ...rest] = posts;
  const name = pick(category.nameVi, category.nameEn, locale);

  return (
    <section className="mb-10 border-t border-gray-200 pt-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-5 w-1 rounded bg-red-700" />
        <Link
          href={`/chuyen-muc/${category.slug}`}
          className="text-lg font-bold text-red-700 uppercase transition hover:underline"
        >
          {name}
        </Link>
        <span className="text-red-700">›</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ArticleFeature post={main} locale={locale} size="md" />
        {rest.length > 0 && (
          <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
            {rest.map((p) => (
              <ArticleThumbItem key={p.id} post={p} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
