import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPublishedPostBySlug, getRelatedPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { pick } from "@/lib/i18n";
import { sanitizePostHtml } from "@/lib/sanitize";
import { RelatedItem } from "@/components/post/related-item";
import { PostCoverFill } from "@/components/post-cover";
import type { Locale } from "@/lib/constants";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: "404" };

  const loc = locale as Locale;
  const title = pick(post.titleVi, post.titleEn, loc);
  const description = post.excerptVi
    ? pick(post.excerptVi, post.excerptEn, loc)
    : undefined;
  // Có ảnh bìa thì dùng làm ảnh chia sẻ; không thì để Next dùng ảnh mặc định
  // của site (src/app/opengraph-image.png).
  const images = post.coverImage ? [post.coverImage] : undefined;
  const path = `/bai-viet/${post.slug}`;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      images,
      url: loc === "en" ? `/en${path}` : path,
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
    alternates: {
      canonical: loc === "en" ? `/en${path}` : path,
      languages: { vi: path, en: `/en${path}` },
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("post");

  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post.categoryId, post.id, 3);

  const title = pick(post.titleVi, post.titleEn, loc);
  const content = pick(post.contentVi, post.contentEn, loc);
  const categoryName = pick(post.category.nameVi, post.category.nameEn, loc);

  // Dữ liệu có cấu trúc cho Google (rich result: tiêu đề, ảnh, ngày đăng).
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description: post.excerptVi
      ? pick(post.excerptVi, post.excerptEn, loc)
      : undefined,
    image: post.coverImage ? [post.coverImage] : undefined,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    articleSection: categoryName,
    inLanguage: loc === "en" ? "en" : "vi",
    publisher: {
      "@type": "GovernmentOrganization",
      name: "MTTQ xã Phong Hải",
    },
  };

  return (
    <main className="mx-auto w-full max-w-container px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-1.5 text-sm font-medium text-gray-600"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-red-700"
        >
          <HomeIcon className="h-4 w-4" />
          {t("home")}
        </Link>
        <span className="text-gray-300">›</span>
        <Link
          href={`/chuyen-muc/${post.category.slug}`}
          className="hover:text-red-700"
        >
          {categoryName}
        </Link>
        <span className="text-gray-300">›</span>
        <span className="line-clamp-1 font-semibold text-gray-900">
          {title}
        </span>
      </nav>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Bài viết */}
        <article className="border border-gray-200 bg-white p-5 sm:p-6 lg:col-span-8">
          <header className="mb-6">
            <Link
              href={`/chuyen-muc/${post.category.slug}`}
              className="mb-3 inline-block bg-red-700/10 px-2.5 py-1 text-xs font-semibold tracking-wide text-red-700 uppercase transition hover:bg-red-700/20"
            >
              {categoryName}
            </Link>
            <h1 className="text-2xl leading-tight font-bold text-gray-900 sm:text-3xl">
              {title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 border-y border-gray-200 py-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                📅 {formatDate(post.publishedAt)}
              </span>
              {post.author?.name && (
                <span className="flex items-center gap-1">
                  ✍️ {post.author.name}
                </span>
              )}
            </div>
          </header>

          <figure className="mb-8">
            <div className="relative aspect-video w-full overflow-hidden border border-gray-200 bg-gray-100">
              <PostCoverFill
                src={post.coverImage}
                alt={title}
                sizes="(max-width: 1024px) 100vw, 720px"
                className="object-cover"
                priority
              />
            </div>
          </figure>

          {/* Nội dung HTML do Tiptap sinh — sanitize chống XSS trước khi render. */}
          <div
            className="prose prose-red max-w-none prose-img:border prose-img:border-gray-200"
            dangerouslySetInnerHTML={{ __html: sanitizePostHtml(content) }}
          />

          {post.author?.name && (
            <p className="mt-8 text-right text-sm font-semibold text-red-700">
              {t("byline")}: {post.author.name}
            </p>
          )}
        </article>

        {/* Sidebar — bám dính khi cuộn (desktop) vì bài viết thường dài hơn */}
        <aside className="flex flex-col gap-6 lg:col-span-4 lg:sticky lg:top-6 lg:self-start">
          {/* Tin tức liên quan */}
          {related.length > 0 && (
            <section className="border border-gray-200 bg-white p-4">
              <h2 className="mb-4 flex items-center gap-2 border-b border-gray-200 pb-2 text-lg font-bold text-red-700">
                <span className="h-5 w-1 bg-red-700" />
                {t("related")}
              </h2>
              <div className="flex flex-col gap-4">
                {related.map((p) => (
                  <RelatedItem key={p.id} post={p} locale={loc} />
                ))}
              </div>
            </section>
          )}

          {/* CTA Lắng nghe dân nói */}
          <section className="border border-gray-200 bg-red-50 p-4">
            <h2 className="text-lg font-bold text-red-700">
              {t("listenTitle")}
            </h2>
            <p className="mt-1 text-sm text-gray-600">{t("listenDesc")}</p>
            <Link
              href="/lang-nghe-dan-noi"
              className="mt-4 flex items-center justify-center gap-2 bg-red-700 py-2.5 font-medium text-white transition hover:bg-red-800"
            >
              {t("listenCta")} →
            </Link>
          </section>
        </aside>
      </div>
    </main>
  );
}

// Icon ngôi nhà cho breadcrumb (SVG nội tuyến, không cần thư viện ngoài).
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </svg>
  );
}
