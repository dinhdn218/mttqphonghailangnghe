import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/lib/constants";
import type { HomePost } from "./types";
import { ArticleThumbItem } from "./article-thumb-item";

type Category = { slug: string; nameVi: string; nameEn: string | null };

// Khối một chuyên mục (tham khảo Dân Trí): tiêu đề đỏ + bài chính hẹp (ảnh 3/2 +
// tiêu đề + tóm tắt) | viền ngăn | danh sách 4 bài (tiêu đề trái + thumb phải).
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
  const title = pick(main.titleVi, main.titleEn, locale);
  const excerpt = main.excerptVi
    ? pick(main.excerptVi, main.excerptEn, locale)
    : null;

  return (
    <section className="border-t-2 border-gray-200 pt-4">
      {/* Tiêu đề chuyên mục */}
      <div className="mb-4 flex items-center gap-2">
        <span className="h-5 w-1 rounded bg-red-700" />
        <Link
          href={`/chuyen-muc/${category.slug}`}
          className="text-base font-bold text-red-700 uppercase transition hover:underline"
        >
          {name}
        </Link>
        <span className="text-red-700">›</span>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
        {/* Bài chính (hẹp) */}
        <Link
          href={`/bai-viet/${main.slug}`}
          className="group block sm:w-48 sm:shrink-0"
        >
          {main.coverImage && (
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded bg-gray-100">
              <Image
                src={main.coverImage}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, 200px"
                className="object-cover"
              />
            </div>
          )}
          <h3 className="mt-2 line-clamp-2 text-base leading-snug font-semibold text-gray-900 transition group-hover:text-red-700">
            {title}
          </h3>
          {excerpt && (
            <p className="mt-1 line-clamp-4 text-sm leading-5 text-gray-600">
              {excerpt}
            </p>
          )}
        </Link>

        {/* Danh sách bài còn lại */}
        {rest.length > 0 && (
          <div className="flex-1 sm:border-l sm:border-gray-200 sm:pl-5">
            {rest.map((p, i) => (
              <div
                key={p.id}
                className={i > 0 ? "mt-3 border-t border-gray-200 pt-3" : ""}
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
