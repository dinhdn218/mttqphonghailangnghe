import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

// 404 cho các trang trong [locale] (vd bài viết / chuyên mục không tồn tại).
export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-5xl font-bold text-red-700">404</p>
      <h1 className="mt-4 text-xl font-bold">{t("title")}</h1>
      <p className="mt-2 text-gray-600">{t("desc")}</p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-red-700 px-5 py-2.5 font-medium text-white transition hover:bg-red-800"
      >
        {t("home")}
      </Link>
    </main>
  );
}
