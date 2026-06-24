import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/lib/constants";
import type { HomePost } from "./types";

// Thẻ bài: ảnh trên (tỉ lệ 3/2) + tiêu đề (không tóm tắt) — dùng ở cột trái khối nổi bật.
export function ArticleCardTop({
  post,
  locale,
}: {
  post: HomePost;
  locale: Locale;
}) {
  const title = pick(post.titleVi, post.titleEn, locale);

  return (
    <Link href={`/bai-viet/${post.slug}`} className="group block space-y-2">
      {post.coverImage && (
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded bg-gray-100">
          <Image
            src={post.coverImage}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 280px"
            className="object-cover"
          />
        </div>
      )}
      <h3 className="line-clamp-3 text-base leading-snug font-semibold text-gray-900 transition group-hover:text-red-700">
        {title}
      </h3>
    </Link>
  );
}
