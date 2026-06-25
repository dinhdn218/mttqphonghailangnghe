import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title") };
}

// Ảnh placeholder (thay bằng ảnh thật của xã sau).
const HERO_IMG = "https://picsum.photos/seed/phonghai-hero/1280/520";
const HISTORY_IMG = "https://picsum.photos/seed/phonghai-history/800/600";

// Icon nhỏ (Heroicons outline) qua path.
function Icon({ path, className }: { path: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "h-6 w-6"}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

const ICONS = {
  users:
    "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z",
  shield:
    "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
  megaphone:
    "M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73",
  user: "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0",
  mail: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5A2.25 2.25 0 0 0 2.25 6.75m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75",
  phone:
    "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z",
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tn = await getTranslations("nav");

  const functions = [
    { icon: ICONS.users, title: t("fn1Title"), desc: t("fn1Desc") },
    { icon: ICONS.shield, title: t("fn2Title"), desc: t("fn2Desc") },
    { icon: ICONS.megaphone, title: t("fn3Title"), desc: t("fn3Desc") },
  ];
  const leaders = [
    { name: "Nguyễn Văn A", role: t("roleChairman") },
    { name: "Trần Thị B", role: t("roleVice") },
    { name: "Lê Văn C", role: t("roleMember") },
  ];

  return (
    <main className="mx-auto w-full max-w-container space-y-12 px-4 py-8">
      {/* Hero */}
      <section className="relative flex min-h-[300px] items-end overflow-hidden rounded-xl sm:min-h-[400px]">
        <Image
          src={HERO_IMG}
          alt={t("title")}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-red-950 via-red-900/55 to-transparent" />
        <div className="relative z-10 max-w-3xl p-6 text-white sm:p-10">
          <nav className="mb-3 flex items-center gap-1.5 text-sm text-amber-200/90">
            <Link href="/" className="hover:underline">
              {tn("home")}
            </Link>
            <span>›</span>
            <span>{tn("about")}</span>
          </nav>
          <h1 className="text-2xl leading-snug font-bold sm:text-3xl">
            {t("title")}
          </h1>
          <p className="mt-3 text-white/90 sm:text-lg">{t("subtitle")}</p>
        </div>
      </section>

      {/* Vạch hoa văn (thổ cẩm) */}
      <div className="h-1.5 w-full rounded-full bg-[repeating-linear-gradient(45deg,#f59e0b_0,#f59e0b_8px,#7f1d1d_8px,#7f1d1d_16px)]" />

      {/* Lịch sử hình thành */}
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <SectionHeading>{t("historyTitle")}</SectionHeading>
          <p className="leading-relaxed text-gray-700">{t("history1")}</p>
          <p className="leading-relaxed text-gray-700">{t("history2")}</p>
          <blockquote className="border-l-4 border-amber-400 bg-red-50 p-4 text-gray-700 italic">
            “{t("quote")}”
            <span className="mt-1 block text-sm font-medium text-red-800 not-italic">
              — {t("quoteAuthor")}
            </span>
          </blockquote>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100 shadow-md">
          <Image
            src={HISTORY_IMG}
            alt={t("historyTitle")}
            fill
            sizes="(max-width: 768px) 100vw, 520px"
            className="object-cover"
          />
        </div>
      </section>

      {/* Chức năng & Nhiệm vụ */}
      <section className="rounded-xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
        <div className="mb-6 text-center">
          <h2 className="text-lg font-bold tracking-wide text-red-800 uppercase">
            {t("functionsTitle")}
          </h2>
          <span className="mx-auto mt-2 block h-1 w-20 rounded bg-amber-400" />
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {functions.map((f) => (
            <div
              key={f.title}
              className="group rounded-lg border border-gray-200 bg-white p-6 transition hover:border-amber-400 hover:shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-800 text-amber-300 transition group-hover:bg-red-700">
                <Icon path={f.icon} />
              </div>
              <h3 className="mt-4 font-bold text-red-800">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Cơ cấu tổ chức */}
      <section className="space-y-5">
        <SectionHeading>{t("orgTitle")}</SectionHeading>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {leaders.map((l) => (
            <div
              key={l.name}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="flex h-40 items-center justify-center bg-gradient-to-b from-red-50 to-gray-100 text-red-200">
                <Icon path={ICONS.user} className="h-16 w-16" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-red-800">{l.name}</h3>
                <p className="mt-1 text-xs tracking-wide text-gray-500 uppercase">
                  {l.role}
                </p>
                <div className="mt-2 flex justify-center gap-3 text-gray-400">
                  <Icon path={ICONS.mail} className="h-4 w-4" />
                  <Icon path={ICONS.phone} className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
          {/* Thẻ ghi chú thêm */}
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-red-200 bg-red-50/40 p-6 text-center">
            <Icon path={ICONS.users} className="mb-2 h-9 w-9 text-red-300" />
            <p className="text-sm text-red-700/70">{t("orgNote")}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center justify-between gap-6 rounded-xl border-b-4 border-amber-400 bg-red-800 p-6 text-white sm:p-8 md:flex-row">
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold sm:text-xl">{t("ctaTitle")}</h2>
          <p className="mt-1 text-white/85">{t("ctaDesc")}</p>
        </div>
        <Link
          href="/lang-nghe-dan-noi"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-amber-400 px-6 py-3 font-bold text-red-900 transition hover:bg-amber-300"
        >
          {tn("contact")} →
        </Link>
      </section>
    </main>
  );
}

// Tiêu đề mục: thanh đỏ + chữ in hoa đỏ.
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-6 w-1 rounded bg-red-700" />
      <h2 className="text-lg font-bold tracking-wide text-red-800 uppercase">
        {children}
      </h2>
    </div>
  );
}
