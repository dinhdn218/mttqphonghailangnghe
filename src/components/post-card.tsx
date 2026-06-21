import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/format";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/lib/constants";

type PostCardData = {
  slug: string;
  titleVi: string;
  titleEn: string | null;
  excerptVi: string | null;
  excerptEn: string | null;
  coverImage: string | null;
  publishedAt: Date | null;
  category: { slug: string; nameVi: string; nameEn: string | null };
};

export function PostCard({
  post,
  locale,
}: {
  post: PostCardData;
  locale: Locale;
}) {
  const title = pick(post.titleVi, post.titleEn, locale);
  const excerpt = post.excerptVi
    ? pick(post.excerptVi, post.excerptEn, locale)
    : null;
  const categoryName = pick(post.category.nameVi, post.category.nameEn, locale);

  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:border-red-300 hover:shadow-sm">
      <Link href={`/bai-viet/${post.slug}`} className="block">
        {post.coverImage && (
          <div className="relative aspect-video w-full bg-gray-100">
            <Image
              src={post.coverImage}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, 400px"
              className="object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <p className="text-xs font-medium text-red-700">{categoryName}</p>
          <h3 className="mt-1 line-clamp-2 font-semibold text-gray-900">
            {title}
          </h3>
          {excerpt && (
            <p className="mt-1 line-clamp-2 text-sm text-gray-600">{excerpt}</p>
          )}
          {post.publishedAt && (
            <p className="mt-2 text-xs text-gray-400">
              {formatDate(post.publishedAt)}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
