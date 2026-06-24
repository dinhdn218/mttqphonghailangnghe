import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/lib/constants";
import type { HomePost } from "./types";
import { ArticleCardTop } from "./article-card-top";
import { ArticleThumbItem } from "./article-thumb-item";

// Khối nổi bật kiểu cổng tin tức (tham khảo Dân Trí):
// 3 cột — trái: 2 thẻ ảnh-trên · giữa: 1 bài hero lớn (viền 2 bên) · phải: danh sách.
// Mobile: xếp dọc, hero lên đầu.
export function FeaturedSection({
  posts,
  locale,
}: {
  posts: HomePost[];
  locale: Locale;
}) {
  if (posts.length === 0) return null;

  const hero = posts[0];
  const left = posts.slice(1, 3); // 2 thẻ cột trái
  const right = posts.slice(3, 7); // tối đa 4 mục cột phải

  return (
    <section className="mb-10">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,554px)_minmax(0,300px)]">
        {/* Cột trái: 2 thẻ ảnh-trên */}
        {left.length > 0 && (
          <div className="order-2 lg:order-1">
            {left.map((p, i) => (
              <div
                key={p.id}
                className={i > 0 ? "mt-6 border-t border-gray-200 pt-6" : ""}
              >
                <ArticleCardTop post={p} locale={locale} />
              </div>
            ))}
          </div>
        )}

        {/* Cột giữa: bài hero lớn (viền trái/phải trên desktop) */}
        <div className="order-1 lg:order-2 lg:border-x lg:border-gray-200 lg:px-5">
          <HeroArticle post={hero} locale={locale} />
        </div>

        {/* Cột phải: danh sách tiêu đề + thumb */}
        {right.length > 0 && (
          <div className="order-3">
            {right.map((p, i) => (
              <div
                key={p.id}
                className={i > 0 ? "mt-4 border-t border-gray-200 pt-4" : ""}
              >
                <ArticleThumbItem post={p} locale={locale} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Bài hero: ảnh lớn (3/2) + tiêu đề cỡ lớn + tóm tắt.
function HeroArticle({ post, locale }: { post: HomePost; locale: Locale }) {
  const title = pick(post.titleVi, post.titleEn, locale);
  const excerpt = post.excerptVi
    ? pick(post.excerptVi, post.excerptEn, locale)
    : null;

  return (
    <Link href={`/bai-viet/${post.slug}`} className="group block space-y-3">
      {post.coverImage && (
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={post.coverImage}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 554px"
            className="object-cover transition group-hover:scale-[1.02]"
            priority
          />
        </div>
      )}
      <h2 className="line-clamp-3 text-xl leading-snug font-bold text-gray-900 transition group-hover:text-red-700 sm:text-2xl">
        {title}
      </h2>
      {excerpt && (
        <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
          {excerpt}
        </p>
      )}
    </Link>
  );
}
