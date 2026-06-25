import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/format";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/lib/constants";

type RelatedData = {
  slug: string;
  titleVi: string;
  titleEn: string | null;
  coverImage: string | null;
  publishedAt: Date | null;
};

// Mục tin liên quan trong sidebar: thumb vuông trái + tiêu đề + ngày.
export function RelatedItem({
  post,
  locale,
}: {
  post: RelatedData;
  locale: Locale;
}) {
  const title = pick(post.titleVi, post.titleEn, locale);
  return (
    <Link href={`/bai-viet/${post.slug}`} className="group flex items-start gap-3">
      {post.coverImage && (
        <div className="relative h-20 w-20 shrink-0 overflow-hidden border border-gray-200 bg-gray-100">
          <Image
            src={post.coverImage}
            alt={title}
            fill
            sizes="80px"
            className="object-cover transition group-hover:opacity-80"
          />
        </div>
      )}
      <div className="min-w-0">
        <h4 className="line-clamp-2 text-sm leading-snug font-medium text-gray-900 transition group-hover:text-red-700">
          {title}
        </h4>
        {post.publishedAt && (
          <span className="mt-1 block text-xs text-gray-500">
            {formatDate(post.publishedAt)}
          </span>
        )}
      </div>
    </Link>
  );
}
