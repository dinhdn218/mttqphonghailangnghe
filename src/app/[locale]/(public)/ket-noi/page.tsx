import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getSettings, type Platform } from "@/lib/settings";
import { QrCode } from "@/components/qr-code";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "connect" });
  return { title: t("title") };
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
  phone:
    "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z",
  mail: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5A2.25 2.25 0 0 0 2.25 6.75m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75",
  location:
    "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z",
  map: "M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z",
  qr: "M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5ZM16.5 13.5h2.25v2.25H16.5V13.5ZM13.5 16.5h2.25v2.25H13.5V16.5ZM16.5 19.5h2.25v.008H16.5V19.5Z",
  info: "M11.25 11.25h.75v5.25m-.75 0h1.5m9-5.25a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V7.5Z",
  network:
    "M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z",
  chat: "M7.5 8.25h9m-9 3H12m9 .75c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z",
};

// Logo thương hiệu (fill) — đặt trong ô vuông màu nền.
function BrandMark({ kind }: { kind: string }) {
  if (kind === "facebook")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z" />
      </svg>
    );
  if (kind === "tiktok")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.6c.26 0 .51.04.75.11V9.66a5.7 5.7 0 1 0 4.94 5.64V8.99a7.34 7.34 0 0 0 4.3 1.38V7.3a4.28 4.28 0 0 1-3.25-1.48Z" />
      </svg>
    );
  // Zalo: dùng chữ
  return <span className="text-xs font-extrabold tracking-tight">Zalo</span>;
}

const BRAND_BG: Record<string, string> = {
  facebook: "bg-[#1877F2]",
  "zalo-oa-xa": "bg-[#0068FF]",
  tiktok: "bg-black",
};

export default async function ConnectPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("connect");

  const { contact, platforms } = await getSettings();
  const tel = contact.hotline.replace(/\s/g, "");
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`;

  return (
    <main className="mx-auto w-full max-w-container space-y-8 px-4 py-8">
      {/* Tiêu đề trang */}
      <header className="flex items-center justify-between gap-4 border border-gray-200 bg-white p-6 shadow-sm">
        <div className="border-l-4 border-red-700 pl-4">
          <h1 className="text-2xl font-bold text-red-800 sm:text-3xl">
            {t("title")}
          </h1>
          <p className="mt-2 max-w-2xl text-gray-600">{t("intro")}</p>
        </div>
        <Icon
          path={ICONS.network}
          className="hidden h-16 w-16 shrink-0 text-gray-200 sm:block"
        />
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Cột trái: thông tin liên hệ */}
        <section className="flex flex-col overflow-hidden border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center gap-2 bg-red-800 px-5 py-4 text-amber-300">
            <Icon path={ICONS.info} className="h-5 w-5" />
            <h2 className="font-bold tracking-wide text-white uppercase">
              {t("contactInfo")}
            </h2>
          </div>
          <div className="space-y-5 p-5">
            <ContactRow icon={ICONS.phone} label={t("hotline")}>
              <a
                href={`tel:${tel}`}
                className="text-lg font-bold text-red-700 hover:underline"
              >
                {contact.hotline}
              </a>
            </ContactRow>
            <ContactRow icon={ICONS.mail} label={t("emailLabel")}>
              <a
                href={`mailto:${contact.email}`}
                className="font-medium break-all text-gray-800 hover:text-red-700"
              >
                {contact.email}
              </a>
            </ContactRow>
            <ContactRow icon={ICONS.location} label={t("addressLabel")}>
              <span className="font-medium text-gray-800">
                {contact.address}
              </span>
            </ContactRow>
          </div>

          {/* Bản đồ nhúng Google Maps — chiếm hết chiều cao còn lại */}
          <div className="relative flex min-h-[300px] flex-1 flex-col">
            <iframe
              title={t("viewMap")}
              src={`https://www.google.com/maps?q=${encodeURIComponent(contact.address)}&output=embed`}
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 mt-auto flex items-center justify-center gap-1.5 bg-white/90 px-4 py-2 text-sm font-medium text-gray-600 backdrop-blur-sm transition hover:bg-white hover:text-red-700"
            >
              <Icon path={ICONS.map} className="h-4 w-4" />
              {t("viewMap")}
            </a>
          </div>
        </section>

        {/* Cột phải: nền tảng + CTA — cao bằng cột trái, khối QR giãn lấp phần dư */}
        <div className="flex flex-col gap-6">
          <section className="flex flex-1 flex-col border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-red-800">
              <Icon path={ICONS.qr} className="h-5 w-5" />
              <h2 className="font-bold tracking-wide uppercase">
                {t("platforms")}
              </h2>
            </div>
            <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
              {platforms.map((p) => (
                <PlatformCard
                  key={p.key}
                  platform={p}
                  qrCaption={t("qrCaption")}
                  qrPending={t("qrPending")}
                />
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="flex flex-col items-start justify-between gap-4 bg-red-800 p-6 text-white sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-amber-300">
                {t("ctaTitle")}
              </h2>
              <p className="mt-1 text-sm text-white/85">{t("ctaDesc")}</p>
            </div>
            <Link
              href="/lang-nghe-dan-noi"
              className="inline-flex shrink-0 items-center gap-2 bg-amber-400 px-5 py-3 font-bold text-red-900 transition hover:bg-amber-300"
            >
              <Icon path={ICONS.chat} className="h-5 w-5" />
              {t("ctaButton")}
            </Link>
          </section>
        </div>
      </div>

      {/* Vạch hoa văn thổ cẩm */}
      <div className="h-1.5 w-full bg-[repeating-linear-gradient(45deg,#f59e0b_0,#f59e0b_8px,#7f1d1d_8px,#7f1d1d_16px)]" />
    </main>
  );
}

// Một dòng thông tin: icon tròn hồng + nhãn nhỏ + giá trị.
function ContactRow({
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
      <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-red-50 text-red-700">
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

// Thẻ một nền tảng: logo + tên + mã QR (hoặc placeholder) + chú thích.
function PlatformCard({
  platform,
  qrCaption,
  qrPending,
}: {
  platform: Platform;
  qrCaption: string;
  qrPending: string;
}) {
  const bg = BRAND_BG[platform.key] ?? "bg-gray-700";
  return (
    <div className="flex flex-col justify-between items-center border border-gray-200 p-4 text-center transition hover:border-red-300 hover:shadow-sm">
      <div
        className={`flex h-12 w-12 items-center justify-center text-white ${bg}`}
      >
        <BrandMark kind={platform.key} />
      </div>
      <p className="mt-2 text-sm font-semibold text-gray-800">
        {platform.label}
      </p>
      {/* {platform.note && (
        <p className="text-xs text-gray-500">{platform.note}</p>
      )} */}

      <div className="mt-3">
        {platform.url ? (
          <a href={platform.url} target="_blank" rel="noopener noreferrer">
            <QrCode
              value={platform.url}
              size={120}
              alt={`QR ${platform.label}`}
            />
          </a>
        ) : (
          <div className="flex h-[120px] w-[120px] items-center justify-center border-2 border-dashed border-gray-300 px-2 text-[11px] text-gray-400">
            {qrPending}
          </div>
        )}
      </div>
      <p className="mt-2 text-xs text-gray-500">{qrCaption}</p>
    </div>
  );
}
