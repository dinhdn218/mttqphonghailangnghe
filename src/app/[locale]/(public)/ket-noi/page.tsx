import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { CONTACT, activePlatforms } from "@/lib/contacts";
import { QrCode } from "@/components/qr-code";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "connect" });
  return { title: t("title") };
}

export default async function ConnectPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("connect");
  const platforms = activePlatforms();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p className="mt-2 mb-6 text-gray-600">{t("intro")}</p>

      {/* Thông tin liên hệ */}
      <section className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-3 font-semibold">{t("contactInfo")}</h2>
        <dl className="space-y-2 text-sm">
          <Row label={t("hotline")}>
            <a href={`tel:${CONTACT.hotline.replace(/\s/g, "")}`} className="text-red-700 hover:underline">
              {CONTACT.hotline}
            </a>
          </Row>
          <Row label="Email">
            <a href={`mailto:${CONTACT.email}`} className="text-red-700 hover:underline">
              {CONTACT.email}
            </a>
          </Row>
          <Row label={t("address")}>{CONTACT.address}</Row>
        </dl>
      </section>

      {/* Nền tảng + QR */}
      <section className="mt-8">
        <h2 className="mb-4 font-semibold">{t("platforms")}</h2>
        {platforms.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {platforms.map((p) => (
              <div
                key={p.key}
                className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4"
              >
                <QrCode value={p.url} size={110} alt={`QR ${p.label}`} />
                <div className="min-w-0">
                  <p className="font-medium">{p.label}</p>
                  {p.note && <p className="text-xs text-gray-500">{p.note}</p>}
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-sm text-red-700 hover:underline"
                  >
                    {t("openLink")} ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-500">
            {t("noPlatforms")}
          </p>
        )}
      </section>
    </main>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-2">
      <dt className="w-28 shrink-0 font-medium text-gray-500">{label}</dt>
      <dd className="text-gray-800">{children}</dd>
    </div>
  );
}
