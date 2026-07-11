"use client";

import { useEffect, useState } from "react";

export type FloatingPlatform = { key: string; label: string; url: string };

// Logo thương hiệu.
function BrandIcon({ kind }: { kind: string }) {
  if (kind === "facebook")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z" />
      </svg>
    );
  if (kind === "tiktok")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.6c.26 0 .51.04.75.11V9.66a5.7 5.7 0 1 0 4.94 5.64V8.99a7.34 7.34 0 0 0 4.3 1.38V7.3a4.28 4.28 0 0 1-3.25-1.48Z" />
      </svg>
    );
  // Zalo: dùng chữ
  return <span className="text-[11px] font-extrabold tracking-tight">Zalo</span>;
}

const BRAND_BG: Record<string, string> = {
  facebook: "bg-[#1877F2]",
  "zalo-oa-xa": "bg-[#0068FF]",
  tiktok: "bg-black",
};

// Nút tròn + nhãn hiện khi rê chuột (ẩn trên mobile).
function ActionButton({
  href,
  label,
  bg,
  external,
  wiggle,
  children,
}: {
  href: string;
  label: string;
  bg: string;
  external?: boolean;
  wiggle?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
      aria-label={label}
      title={label}
      className="group relative flex items-center justify-end"
    >
      {/* Nhãn */}
      <span className="pointer-events-none absolute right-14 hidden whitespace-nowrap bg-gray-900/90 px-2.5 py-1 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100 sm:block">
        {label}
      </span>
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg ring-2 ring-white/70 transition duration-200 group-hover:scale-110 ${bg} ${
          wiggle ? "animate-wiggle" : ""
        }`}
      >
        {children}
      </span>
    </a>
  );
}

export function FloatingActions({
  hotline,
  platforms,
}: {
  hotline: string;
  platforms: FloatingPlatform[];
}) {
  const [showTop, setShowTop] = useState(false);
  // Mobile: gom các nền tảng sau một nút mở/đóng cho đỡ chiếm màn hình.
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tel = hotline.replace(/\s/g, "");
  const hasAny = platforms.length > 0 || tel !== "";

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-5 sm:bottom-5">
      {/* Nhóm liên hệ (nền tảng + gọi): mobile gom sau nút ➕, desktop luôn hiện.
          Dùng hidden/flex (không overflow-hidden) để viền trắng của nút không bị cắt. */}
      {hasAny && (
        <div
          className={`flex-col items-end gap-3 sm:flex ${open ? "flex" : "hidden"}`}
        >
          {platforms.map((p, i) => (
            <div
              key={p.key}
              className="animate-fab-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <ActionButton
                href={p.url}
                label={p.label}
                bg={BRAND_BG[p.key] ?? "bg-gray-700"}
                external
                wiggle
              >
                <BrandIcon kind={p.key} />
              </ActionButton>
            </div>
          ))}

          {/* Đường dây nóng — có vòng sóng nhấp nháy */}
          {tel && (
            <div
              className="animate-fab-in relative"
              style={{ animationDelay: `${platforms.length * 60}ms` }}
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-green-500/40" />
              <ActionButton
                href={`tel:${tel}`}
                label={`Gọi ${hotline}`}
                bg="bg-green-600"
                wiggle
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </ActionButton>
            </div>
          )}
        </div>
      )}

      {/* Nút mở/đóng nhóm liên hệ — CHỈ mobile */}
      {hasAny && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Đóng liên hệ" : "Mở liên hệ & mạng xã hội"}
          title="Liên hệ"
          className={`flex h-11 w-11 items-center justify-center rounded-full bg-red-700 text-white shadow-lg ring-2 ring-white/70 transition hover:bg-red-800 sm:hidden ${
            open ? "" : "animate-wiggle"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            className={`h-5 w-5 transition-transform duration-300 ${
              open ? "rotate-45" : ""
            }`}
            aria-hidden="true"
          >
            <path d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      )}

      {/* Lên đầu trang — chỉ hiện khi đã cuộn */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Lên đầu trang"
        title="Lên đầu trang"
        className={`flex h-11 w-11 items-center justify-center rounded-full bg-red-700 text-white shadow-lg ring-2 ring-white/70 transition duration-300 hover:scale-110 hover:bg-red-800 ${
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M4.5 15.75 12 8.25l7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}
