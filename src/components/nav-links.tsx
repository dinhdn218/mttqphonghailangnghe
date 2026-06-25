"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { usePathname, Link } from "@/i18n/navigation";

type NavItem = { href: string; label: string };

// Thanh điều hướng:
// - Mobile: carousel cuộn ngang với nút mũi tên trái/phải.
// - Desktop (md+): flex-wrap bình thường, không carousel.
// Highlight mục đang active bằng nền vàng.
export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  // Cuộn active item vào vùng hiển thị khi mount (chỉ trên mobile).
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const active = el.querySelector<HTMLElement>("[data-active]");
    if (active) {
      active.scrollIntoView({ inline: "center", block: "nearest", behavior: "instant" });
    }
  }, [pathname]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="relative mx-auto flex w-full max-w-container items-center">
      {/* Nút trái — chỉ hiện trên mobile */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 flex h-full w-10 items-center justify-center bg-red-800 text-white shadow-[4px_0_8px_rgba(0,0,0,0.2)] transition hover:bg-red-700 md:hidden"
          aria-label="Cuộn trái"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.56 10l3.22 3.22a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
          </svg>
        </button>
      )}

      {/* Danh sách nav — mobile: cuộn ngang, desktop: flex-wrap */}
      <ul
        ref={scrollRef}
        className="flex w-full gap-px overflow-x-auto whitespace-nowrap px-2 text-sm md:flex-wrap md:overflow-visible md:whitespace-normal"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <li key={item.href} className="shrink-0 md:shrink">
              <Link
                href={item.href}
                {...(isActive ? { "data-active": true } : {})}
                className={`inline-block whitespace-nowrap px-3 py-2.5 font-medium uppercase transition ${
                  isActive
                    ? "bg-amber-400 font-semibold text-red-950"
                    : "text-red-50 hover:bg-red-700"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Nút phải — chỉ hiện trên mobile */}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 flex h-full w-10 items-center justify-center bg-red-800 text-white shadow-[-4px_0_8px_rgba(0,0,0,0.2)] transition hover:bg-red-700 md:hidden"
          aria-label="Cuộn phải"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 0 1-1.06-1.06L11.44 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
}
