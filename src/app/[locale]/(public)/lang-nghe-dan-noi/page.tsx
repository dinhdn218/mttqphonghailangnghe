import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ContactForm } from "./contact-form";
import { getSettings } from "@/lib/settings";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("intro") };
}

// Icon outline (Heroicons) qua path.
function Icon({ path, className }: { path: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
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
  chat: "M7.5 8.25h9m-9 3H12m9 .75c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z",
  phone:
    "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z",
  mail: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5A2.25 2.25 0 0 0 2.25 6.75m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75",
  location:
    "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z",
  check: "m4.5 12.75 6 6 9-13.5",
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tc = await getTranslations("connect");

  const { contact } = await getSettings();
  const tel = contact.hotline.replace(/\s/g, "");
  const commitments = [t("commit1"), t("commit2"), t("commit3")];

  return (
    <main className="mx-auto w-full max-w-container space-y-8 px-4 py-8">
      {/* Tiêu đề trang */}
      <header className="border border-gray-200 bg-white p-6 shadow-sm">
        <div className="border-l-4 border-red-700 pl-4">
          <h1 className="text-2xl font-bold text-red-800 sm:text-3xl">
            {t("title")}
          </h1>
          <p className="mt-2 max-w-2xl text-gray-600">{t("intro")}</p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Form phản ánh */}
        <section className="overflow-hidden border border-gray-200 bg-white shadow-sm lg:col-span-2">
          <div className="flex items-center gap-2 bg-red-800 px-5 py-4 text-amber-300">
            <Icon path={ICONS.chat} className="h-5 w-5" />
            <h2 className="font-bold tracking-wide text-white uppercase">
              {t("formTitle")}
            </h2>
          </div>
          <div className="p-5 sm:p-6">
            <ContactForm />
          </div>
        </section>

        {/* Sidebar: liên hệ trực tiếp + cam kết */}
        <aside className="flex flex-col gap-6">
          <div className="border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 font-bold tracking-wide text-red-800 uppercase">
              {t("directContact")}
            </h3>
            <div className="space-y-4">
              <ContactItem icon={ICONS.phone} label={tc("hotline")}>
                <a
                  href={`tel:${tel}`}
                  className="font-bold text-red-700 hover:underline"
                >
                  {contact.hotline}
                </a>
              </ContactItem>
              <ContactItem icon={ICONS.mail} label={tc("emailLabel")}>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-medium break-all text-gray-800 hover:text-red-700"
                >
                  {contact.email}
                </a>
              </ContactItem>
              <ContactItem icon={ICONS.location} label={tc("addressLabel")}>
                <span className="font-medium text-gray-800">
                  {contact.address}
                </span>
              </ContactItem>
            </div>
          </div>

          {/* Cam kết */}
          <div className="border-l-4 border-amber-400 bg-red-50 p-5 flex-1">
            <h3 className="font-bold text-red-800">{t("commitTitle")}</h3>
            <ul className="mt-3 space-y-2.5">
              {commitments.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <Icon
                    path={ICONS.check}
                    className="mt-0.5 h-4 w-4 shrink-0 text-red-700"
                  />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Vạch hoa văn thổ cẩm */}
      <div className="h-1.5 w-full bg-[repeating-linear-gradient(45deg,#f59e0b_0,#f59e0b_8px,#7f1d1d_8px,#7f1d1d_16px)]" />
    </main>
  );
}

// Dòng liên hệ: icon tròn... à không, ô vuông phẳng + nhãn nhỏ + giá trị.
function ContactItem({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-red-50 text-red-700">
        <Icon path={icon} className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
          {label}
        </p>
        <div className="mt-0.5">{children}</div>
      </div>
    </div>
  );
}
