import { CARD_IMAGE } from "@/lib/ui";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/i18n";
import { formatDate } from "@/lib/format";
import type { Locale } from "@/lib/constants";
import type { HomePost } from "./types";
import { ArticleCardTop } from "./article-card-top";

// Số tin trong hộp "Tin tiêu điểm" — đúng bằng số vừa khít chiều cao cột trái
// (hero + 2 thẻ). Đổi số này thì nhớ đổi HOME_SLOTS ở /admin/noi-bat cho khớp.
const HIGHLIGHT_COUNT = 7;

// Khối nổi bật (tham khảo mẫu cổng tin xã Bắc Hà):
// - Cột trái (8/12): hero ảnh lớn, tiêu đề + tóm tắt OVERLAY trên ảnh + badge "Tin nổi bật";
//   bên dưới 2 thẻ ảnh-trên dàn ngang.
// - Cột phải (4/12): hộp "TIN TIÊU ĐIỂM" khung + nền, danh sách giãn đều hết chiều cao.
// Mobile: xếp dọc, hero lên đầu.
export async function FeaturedSection({
  posts,
  locale,
}: {
  posts: HomePost[];
  locale: Locale;
}) {
  if (posts.length === 0) return null;
  const t = await getTranslations("home");

  const hero = posts[0];
  const cards = posts.slice(1, 3); // 2 thẻ ảnh-trên dưới hero
  // Hộp tiêu điểm: lấy ĐÚNG 7 tin rồi giãn đều hết chiều cao cột trái.
  // (Trước đây đổ dư tin rồi cắt gọn → luôn thừa một tin bị cắt ngang, nhìn như lỗi.)
  const highlights = posts.slice(3, 3 + HIGHLIGHT_COUNT);

  return (
    <section className="mb-8 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
      {/* Cột trái: hero + 2 thẻ */}
      <div className="flex flex-col gap-5 lg:col-span-8">
        <HeroArticle post={hero} locale={locale} featuredLabel={t("featured")} />
        {cards.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2">
            {cards.map((p) => (
              <ArticleCardTop key={p.id} post={p} locale={locale} />
            ))}
          </div>
        )}
      </div>

      {/* Cột phải: hộp Tin tiêu điểm — khớp đúng chiều cao cột trái.
          Wrapper (ô grid) không tự cao theo nội dung → chiều cao hàng do cột trái quyết định.
          aside định vị tuyệt đối lấp đầy ô đó (lg:absolute inset-0), nên bị ràng buộc đúng
          chiều cao cột trái. Số tin lấy VỪA ĐỦ (HIGHLIGHT_COUNT) rồi cho mỗi tin flex-1
          để giãn đều lấp kín — không còn tin nào bị cắt ngang. */}
      {highlights.length > 0 && (
        <div className="lg:relative lg:col-span-4">
          <aside className="flex h-full flex-col border border-gray-200 bg-gray-50/60 p-4 lg:absolute lg:inset-0">
            <h2 className="mb-3 border-b-2 border-red-700 pb-2 text-lg font-bold tracking-wide text-red-700 uppercase">
              {t("highlights")}
            </h2>
            {/* KHÔNG đặt link "Xem tất cả" ở đây: tin tiêu điểm là bài nổi bật
                lấy từ MỌI chuyên mục, nên không có một chuyên mục nào để trỏ tới
                cho đúng. */}
            <div className="flex min-h-0 flex-1 flex-col divide-y divide-gray-200 overflow-hidden">
              {highlights.map((p) => (
                <HighlightItem key={p.id} post={p} locale={locale} />
              ))}
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}

// Bài hero: ảnh lớn với badge + tiêu đề + tóm tắt OVERLAY trên gradient tối.
function HeroArticle({
  post,
  locale,
  featuredLabel,
}: {
  post: HomePost;
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
      className="group relative block h-72 overflow-hidden bg-gray-100 sm:h-100"
    >
      {post.coverImage && (
        <Image
          src={post.coverImage}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 780px"
          className={CARD_IMAGE}
          priority
        />
      )}
      {/* Gradient + nội dung overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/40 to-transparent p-5 text-white sm:p-6">
        <span className="mb-2 inline-block bg-red-700 px-2.5 py-1 text-xs font-semibold tracking-wider uppercase">
          {featuredLabel}
        </span>
        <h2 className="line-clamp-3 text-xl leading-snug font-bold sm:text-[28px] sm:leading-tight">
          {title}
        </h2>
        {excerpt && (
          <p className="mt-2 line-clamp-2 text-sm text-white/90 sm:text-[15px]">
            {excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}

// Mục trong hộp tiêu điểm: tiêu đề + ngày bên trái, thumb bên phải. Spacing cố định.
function HighlightItem({ post, locale }: { post: HomePost; locale: Locale }) {
  const title = pick(post.titleVi, post.titleEn, locale);
  return (
    <Link
      href={`/bai-viet/${post.slug}`}
      // flex-1: mỗi tin giãn đều để cả danh sách lấp kín chiều cao hộp.
      className="group flex flex-1 items-center gap-3 py-3 first:pt-0 last:pb-0"
    >
      <div className="min-w-0 flex-1">
        <h4 className="line-clamp-2 text-sm leading-snug font-semibold text-gray-900 transition group-hover:text-red-700">
          {title}
        </h4>
        {post.publishedAt && (
          <span className="mt-1 block text-xs text-gray-400">
            {formatDate(post.publishedAt)}
          </span>
        )}
      </div>
      {post.coverImage && (
        <div className="relative h-16 w-20 shrink-0 overflow-hidden bg-gray-100">
          <Image
            src={post.coverImage}
            alt={title}
            fill
            sizes="80px"
            className={CARD_IMAGE}
          />
        </div>
      )}
    </Link>
  );
}
