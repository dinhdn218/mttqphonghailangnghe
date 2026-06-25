import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/format";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/lib/constants";

type PostItemData = {
  slug: string;
  titleVi: string;
  titleEn: string | null;
  excerptVi: string | null;
  excerptEn: string | null;
  coverImage: string | null;
  publishedAt: Date | null;
  category: { slug: string; nameVi: string; nameEn: string | null };
};

// Mục bài dạng danh sách ngang (ảnh trái + nội dung phải) — dùng ở "Tin tức mới nhất".
export function PostListItem({
  post,
  locale,
}: {
  post: PostItemData;
  locale: Locale;
}) {
  const title = pick(post.titleVi, post.titleEn, locale);
  const excerpt = post.excerptVi
    ? pick(post.excerptVi, post.excerptEn, locale)
    : null;
  const categoryName = pick(post.category.nameVi, post.category.nameEn, locale);

  return (
    <Link
      href={`/bai-viet/${post.slug}`}
      className="group flex flex-col gap-4 border border-gray-200 bg-white p-4 transition hover:bg-red-50/40 sm:flex-row sm:gap-6"
    >
      {post.coverImage && (
        <div className="relative h-44 w-full shrink-0 overflow-hidden bg-gray-100 sm:h-40 sm:w-64">
          <Image
            src={post.coverImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, 256px"
            className="object-cover transition group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col">
        <div className="mb-2 flex items-center gap-3">
          <span className="bg-red-700/10 px-2 py-0.5 text-xs font-semibold text-red-700">
            {categoryName}
          </span>
          {post.publishedAt && (
            <span className="text-xs text-gray-500">
              {formatDate(post.publishedAt)}
            </span>
          )}
        </div>
        <h3 className="mb-1.5 text-lg leading-snug font-semibold text-gray-900 transition group-hover:text-red-700">
          {title}
        </h3>
        {excerpt && (
          <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
            {excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
