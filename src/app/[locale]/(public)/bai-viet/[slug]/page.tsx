import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPublishedPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { pick } from "@/lib/i18n";
import { sanitizePostHtml } from "@/lib/sanitize";
import type { Locale } from "@/lib/constants";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: "404" };
  return {
    title: pick(post.titleVi, post.titleEn, locale as Locale),
    description: post.excerptVi
      ? pick(post.excerptVi, post.excerptEn, locale as Locale)
      : undefined,
    openGraph: post.coverImage ? { images: [post.coverImage] } : undefined,
  };
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const loc = locale as Locale;
  const title = pick(post.titleVi, post.titleEn, loc);
  const content = pick(post.contentVi, post.contentEn, loc);
  const categoryName = pick(post.category.nameVi, post.category.nameEn, loc);

  return (
    <main className="mx-auto w-full max-w-container px-4 py-8">
      <nav className="mb-4 text-sm">
        <Link
          href={`/chuyen-muc/${post.category.slug}`}
          className="font-medium text-red-700 hover:underline"
        >
          ← {categoryName}
        </Link>
      </nav>

      <article>
        <header className="mb-6">
          <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
          <p className="mt-2 text-sm text-gray-500">
            {post.author?.name && <span>{post.author.name} · </span>}
            {formatDate(post.publishedAt)}
          </p>
        </header>

        {post.coverImage && (
          <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
            <Image
              src={post.coverImage}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Nội dung HTML do Tiptap sinh — sanitize chống XSS trước khi render. */}
        <div
          className="prose prose-red max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizePostHtml(content) }}
        />
      </article>
    </main>
  );
}
