import type { Locale } from "@/lib/constants";
import type { HomePost } from "./types";
import { ArticleFeature } from "./article-feature";
import { ArticleThumbItem } from "./article-thumb-item";

// Khối nổi bật đầu trang: 1 bài lớn + danh sách các bài còn lại (tối đa 5 bài).
export function FeaturedSection({
  posts,
  locale,
}: {
  posts: HomePost[];
  locale: Locale;
}) {
  if (posts.length === 0) return null;
  const [main, ...rest] = posts;

  return (
    <section className="mb-10">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ArticleFeature post={main} locale={locale} size="lg" />
        </div>
        {rest.length > 0 && (
          <div className="flex flex-col divide-y divide-gray-100 lg:border-l lg:border-gray-100 lg:pl-6">
            {rest.map((p) => (
              <div key={p.id} className="py-3 first:pt-0 last:pb-0">
                <ArticleThumbItem post={p} locale={locale} showCategory />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
