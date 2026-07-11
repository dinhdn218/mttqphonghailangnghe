import { CARD_IMAGE } from "@/lib/ui";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/i18n";
import { formatDate } from "@/lib/format";
import type { Locale } from "@/lib/constants";
import type { HomePost } from "./types";

type Category = { slug: string; nameVi: string; nameEn: string | null };

// Khối một chuyên mục (tham khảo mẫu cổng tin xã Bắc Hà):
// tiêu đề đỏ có vạch | 2 tin có ảnh song song (ảnh + tiêu đề + tóm tắt) |
// danh sách tin dạng text với icon › căn giữa theo tiêu đề.
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
  const featured = posts.slice(0, 2); // 2 tin có ảnh song song
  const rest = posts.slice(2); // tin còn lại dạng text
  const name = pick(category.nameVi, category.nameEn, locale);

  return (
    <section className="flex flex-col gap-4">
      {/* Tiêu đề chuyên mục */}
      <Link
        href={`/chuyen-muc/${category.slug}`}
        className="group flex items-center gap-2 border-b border-gray-200 pb-2"
      >
        <span className="h-6 w-1 bg-red-700" />
        <h2 className="text-lg font-bold tracking-wide text-red-700 uppercase transition group-hover:underline">
          {name}
        </h2>
        <span className="text-red-700">›</span>
      </Link>

      {/* 2 tin có ảnh song song */}
      <div className="grid gap-5 sm:grid-cols-2">
        {featured.map((p) => (
          <FeaturedCard key={p.id} post={p} locale={locale} />
        ))}
      </div>

      {/* Danh sách tin còn lại: text + icon › căn giữa */}
      {rest.length > 0 && (
        <ul className="flex flex-col gap-3 border-t border-gray-200 pt-4">
          {rest.map((p) => (
            <li key={p.id}>
              <Link
                href={`/bai-viet/${p.slug}`}
                className="group flex items-center gap-2"
              >
                <span className="shrink-0 text-red-700">›</span>
                <span className="line-clamp-1 text-sm leading-snug text-gray-800 transition group-hover:text-red-700">
                  {pick(p.titleVi, p.titleEn, locale)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// Tin có ảnh: ảnh trên (16/9) + tiêu đề + tóm tắt.
function FeaturedCard({ post, locale }: { post: HomePost; locale: Locale }) {
  const title = pick(post.titleVi, post.titleEn, locale);
  const excerpt = post.excerptVi
    ? pick(post.excerptVi, post.excerptEn, locale)
    : null;

  return (
    <Link href={`/bai-viet/${post.slug}`} className="group flex flex-col gap-2">
      {post.coverImage && (
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
          <Image
            src={post.coverImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, 280px"
            className={CARD_IMAGE}
          />
        </div>
      )}
      <h3 className="line-clamp-2 text-base leading-snug font-semibold text-gray-900 transition group-hover:text-red-700">
        {title}
      </h3>
      {post.publishedAt && (
        <span className="text-xs text-gray-500">
          {formatDate(post.publishedAt)}
        </span>
      )}
      {excerpt && (
        <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
          {excerpt}
        </p>
      )}
    </Link>
  );
}
