import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/lib/constants";
import type { HomePost } from "./types";

// Bài nổi bật cỡ lớn: ảnh trên + chuyên mục + tiêu đề + tóm tắt.
export function ArticleFeature({
  post,
  locale,
  size = "lg",
}: {
  post: HomePost;
  locale: Locale;
  size?: "lg" | "md";
}) {
  const title = pick(post.titleVi, post.titleEn, locale);
  const excerpt = post.excerptVi
    ? pick(post.excerptVi, post.excerptEn, locale)
    : null;
  const categoryName = pick(post.category.nameVi, post.category.nameEn, locale);

  return (
    <Link href={`/bai-viet/${post.slug}`} className="group block">
      {post.coverImage && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={post.coverImage}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 640px"
            className="object-cover transition group-hover:scale-[1.02]"
            priority={size === "lg"}
          />
        </div>
      )}
      <p className="mt-2 text-xs font-medium text-red-700">{categoryName}</p>
      <h3
        className={`mt-1 font-bold text-gray-900 transition group-hover:text-red-700 ${
          size === "lg"
            ? "line-clamp-3 text-xl sm:text-2xl"
            : "line-clamp-2 text-lg"
        }`}
      >
        {title}
      </h3>
      {excerpt && (
        <p className="mt-1.5 line-clamp-3 text-sm text-gray-600">{excerpt}</p>
      )}
    </Link>
  );
}
