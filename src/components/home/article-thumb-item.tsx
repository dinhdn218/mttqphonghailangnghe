import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/lib/constants";
import type { HomePost } from "./types";

// Mục bài nhỏ: tiêu đề bên trái + ảnh thumb nhỏ bên phải (kiểu danh sách tin).
export function ArticleThumbItem({
  post,
  locale,
  showCategory = false,
}: {
  post: HomePost;
  locale: Locale;
  showCategory?: boolean;
}) {
  const title = pick(post.titleVi, post.titleEn, locale);
  const categoryName = pick(post.category.nameVi, post.category.nameEn, locale);

  return (
    <Link href={`/bai-viet/${post.slug}`} className="group flex gap-3">
      <div className="min-w-0 flex-1">
        {showCategory && (
          <p className="mb-0.5 text-xs font-medium text-red-700">
            {categoryName}
          </p>
        )}
        <h4 className="line-clamp-3 text-sm leading-snug font-medium text-gray-900 transition group-hover:text-red-700">
          {title}
        </h4>
      </div>
      {post.coverImage && (
        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded bg-gray-100">
          <Image
            src={post.coverImage}
            alt={title}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
      )}
    </Link>
  );
}
