import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CATEGORIES, type Locale } from "@/lib/constants";
import { pick } from "@/lib/i18n";
import { getRecentPublishedPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

type Props = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const recentPosts = await getRecentPublishedPosts(6);

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8">
      <section>
        <h2 className="mb-4 text-lg font-bold">{t("home.latest")}</h2>
        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} locale={locale as Locale} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">{t("home.noPosts")}</p>
        )}
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-lg font-bold">{t("home.categories")}</h2>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/chuyen-muc/${c.slug}`}
                className="block rounded-lg border border-gray-200 bg-white px-4 py-3 transition hover:border-red-300 hover:bg-red-50"
              >
                {pick(c.nameVi, c.nameEn, locale as Locale)}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
