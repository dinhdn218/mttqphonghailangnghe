import { CARD_IMAGE } from "@/lib/ui";
import { PostCoverFill } from "@/components/post-cover";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/format";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/lib/constants";

type FeaturedPost = {
  slug: string;
  titleVi: string;
  titleEn: string | null;
  excerptVi: string | null;
  excerptEn: string | null;
  coverImage: string | null;
  publishedAt: Date | null;
  category: { slug: string; nameVi: string; nameEn: string | null };
};

// Khối nổi bật kiểu bento (tham khảo mẫu cổng tin Bắc Hà):
// 1 bài lớn (8/12, ảnh + overlay + badge "Tin nổi bật") + 2 bài phụ (4/12, xếp dọc).
export function CategoryFeatured({
  big,
  small,
  locale,
  featuredLabel,
}: {
  big: FeaturedPost;
  small: FeaturedPost[];
  locale: Locale;
  featuredLabel: string;
}) {
  return (
    <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
      {/* Bài lớn */}
      <BigCard post={big} locale={locale} featuredLabel={featuredLabel} />

      {/* 2 bài phụ — chiều cao tự nhiên (ảnh aspect-video), cột này quyết định chiều cao hàng */}
      {small.length > 0 && (
        <div className="flex flex-col gap-6 lg:col-span-4">
          {small.map((p) => (
            <SmallCard key={p.slug} post={p} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}

function BigCard({
  post,
  locale,
  featuredLabel,
}: {
  post: FeaturedPost;
  locale: Locale;
  featuredLabel: string;
}) {
  const title = pick(post.titleVi, post.titleEn, locale);
  const excerpt = post.excerptVi
    ? pick(post.excerptVi, post.excerptEn, locale)
    : null;

  return (
    <Link
      href={`/bai-viet/${post.slug}`}
      className="group relative flex h-80 flex-col overflow-hidden border border-gray-200 bg-gray-900 lg:col-span-8 lg:h-full"
    >
      {/* Ảnh chiếm phần trên (flex-1) — co giãn theo chiều cao cột, không bị kéo quá cao */}
      <div className="relative min-h-0 flex-1 overflow-hidden bg-gray-100">
        <PostCoverFill
          src={post.coverImage}
          alt={title}
          sizes="(max-width: 1024px) 100vw, 760px"
          className={CARD_IMAGE}
          priority
        />
        {/* Gradient mỏng ở đáy ảnh để liền mạch với dải text */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-gray-900/80 to-transparent" />
      </div>

      {/* Dải text dưới ảnh */}
      <div className="shrink-0 bg-gray-900 p-5 text-white sm:p-6">
        <div className="mb-2 flex flex-wrap items-center gap-3">
          <span className="bg-red-700 px-2 py-1 text-xs font-semibold tracking-wide uppercase">
            {featuredLabel}
          </span>
          {post.publishedAt && (
            <span className="text-xs text-white/90">
              {formatDate(post.publishedAt)}
            </span>
          )}
        </div>
        <h2 className="line-clamp-2 text-xl leading-snug font-bold sm:text-2xl">
          {title}
        </h2>
        {excerpt && (
          <p className="mt-2 line-clamp-2 text-sm text-white/90">{excerpt}</p>
        )}
      </div>
    </Link>
  );
}

function SmallCard({ post, locale }: { post: FeaturedPost; locale: Locale }) {
  const title = pick(post.titleVi, post.titleEn, locale);
  const categoryName = pick(post.category.nameVi, post.category.nameEn, locale);

  return (
    <Link
      href={`/bai-viet/${post.slug}`}
      className="group flex flex-col overflow-hidden border border-gray-200 bg-white transition hover:border-amber-400"
    >
      <div className="relative aspect-5/2 w-full shrink-0 overflow-hidden bg-gray-100">
        <PostCoverFill
          src={post.coverImage}
          alt={title}
          sizes="(max-width: 1024px) 100vw, 360px"
          className={CARD_IMAGE}
        />
      </div>
      <div className="flex flex-col gap-1 p-4">
        <span className="text-xs font-semibold tracking-wide text-red-700 uppercase">
          {categoryName}
        </span>
        <h3 className="line-clamp-2 leading-snug font-semibold text-gray-900 transition group-hover:text-red-700">
          {title}
        </h3>
        {post.publishedAt && (
          <span className="mt-2 border-t border-gray-200 pt-2 text-xs text-gray-500">
            {formatDate(post.publishedAt)}
          </span>
        )}
      </div>
    </Link>
  );
}
