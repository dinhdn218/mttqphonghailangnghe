"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { usePathname, Link } from "@/i18n/navigation";

type NavItem = { href: string; label: string };

// Thanh điều hướng:
// - Mobile: carousel cuộn ngang với nút mũi tên trái/phải.
// - Desktop (md+): flex-wrap bình thường, không carousel.
// - Cuộn qua thì thanh này DÍNH lên đỉnh màn hình (dải tiện ích + banner cuộn đi).
// Highlight mục đang active bằng nền vàng.
export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLUListElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  // Đã cuộn qua header chưa — dùng để thu gọn menu trên desktop.
  const [stuck, setStuck] = useState(false);
  // Chiều cao nav lúc menu còn nở (3 dòng). Lúc gom dòng, phần hụt đi được bù
  // bằng ô đệm trong suốt để trang không ngắn lại — xem chú thích effect dưới.
  const [expandedH, setExpandedH] = useState<number | null>(null);
  // Chiều cao nav lúc đã gom (1 dòng) — đo sau khi gom, để tính phần hụt.
  const [collapsedH, setCollapsedH] = useState<number | null>(null);

  // Việc DÍNH đã do CSS `sticky` lo (xem .site-header trong globals.css), không
  // cần JS. Effect này chỉ để biết nav ĐANG dính hay chưa, nhằm đổi cách xếp
  // menu trên desktop: lúc dính thì gom về một dòng cuộn ngang thay vì 3 dòng
  // (~123px, chiếm hơn nửa màn hình).
  //
  // ⚠️ Vì sao KHÔNG đo getBoundingClientRect().top của <nav> nữa (bản trước làm
  // vậy và bị giật/nhấp nháy): chính việc gom 3 dòng → 1 dòng làm nav thấp đi
  // 82px, header co lại, trang ngắn đi nên trình duyệt kéo tụt scrollY. Tụt
  // xong thì nav lại rời đỉnh → bỏ dính → nở lại 3 dòng → chạm đỉnh → dính…
  // Đo được vòng lặp này bật/tắt 21/60 khung hình, scrollY nhảy 114→29→120→35.
  // Vùng trễ 24px không thể đỡ nổi cú nhảy 82px.
  //
  // Cách sửa: mốc so sánh phải là đại lượng KHÔNG đổi khi nav co lại.
  //   - Dùng scrollY so với tổng chiều cao hai dải trên (bandSum) — hai dải này
  //     nằm TRÊN nav nên co giãn của nav không ảnh hưởng tới chúng.
  //   - Đồng thời GIỮ CHỖ bằng một ô đệm TRONG SUỐT đặt ngay sau <nav>, cao
  //     đúng phần vừa hụt đi. Trang không ngắn lại → scrollY không bị kéo tụt
  //     → hết vòng lặp. Chỉ áp dụng ở desktop (md+); mobile vốn đã 1 dòng.
  //     Ô đệm KHÔNG tô nền, và bản thân <nav> chỉ cao 1 dòng, nên nhìn vào
  //     không thấy mảng đỏ thừa — trước đây đặt minHeight lên chính <nav> thì
  //     nav tô đỏ hết cả phần giữ chỗ, thừa ~82px.
  useEffect(() => {
    const el = navRef.current;
    const header = el?.closest<HTMLElement>(".site-header");
    if (!el || !header) return;

    const bands = Array.from(
      header.querySelectorAll<HTMLElement>(".site-header-band"),
    );
    // bandSum: quãng header được phép trôi lên = tổng chiều cao hai dải trên.
    // Ghi vào biến CSS để `top` âm của .site-header khớp đúng, không thừa
    // không thiếu. Cũng chính là ngưỡng scrollY để coi là đã dính.
    let bandSum = 0;

    const measure = () => {
      const total = bands.reduce((sum, b) => sum + b.offsetHeight, 0);
      if (total > 0) {
        bandSum = total;
        header.style.setProperty("--site-header-bands", `${total}px`);
      }
      // Chiều cao nav lúc CHƯA gom dòng — chỉ đo khi đang nở, vì lúc đã gom
      // thì số đo là của 1 dòng, ghim nhầm sẽ làm tụt chỗ đã giữ.
      // Chỉ giữ chỗ ở desktop: dưới md menu luôn 1 dòng, giữ chỗ sẽ thừa.
      if (!el.dataset.stuck && window.matchMedia("(min-width: 48rem)").matches) {
        const h = el.offsetHeight;
        if (h > 0) setExpandedH(h);
      }
    };
    measure();

    let raf = 0;
    const onScroll = () => {
      if (raf) return; // gộp nhiều sự kiện vào 1 khung hình
      raf = requestAnimationFrame(() => {
        raf = 0;
        // So bằng scrollY — không phụ thuộc chiều cao nav nên không tự kích
        // hoạt lại chính mình. Vùng trễ 8px cho lúc rời đỉnh.
        const y = window.scrollY;
        setStuck((prev) => (prev ? y > bandSum - 8 : y >= bandSum));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Tên cơ quan xuống dòng khi xoay ngang/đổi cỡ chữ → đo lại.
    const ro = new ResizeObserver(() => {
      measure();
      onScroll();
    });
    bands.forEach((b) => ro.observe(b));

    return () => {
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Đánh dấu trạng thái lên DOM để measure() biết lúc nào được phép đo lại
  // chiều cao nav (chỉ khi đang nở), đồng thời đo chiều cao lúc đã gom dòng để
  // tính ra phần hụt cần bù bằng ô đệm.
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    if (stuck) {
      el.dataset.stuck = "true";
      setCollapsedH(el.offsetHeight);
    } else delete el.dataset.stuck;
  }, [stuck]);

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
    // `stuck` đổi làm menu desktop chuyển giữa 3 dòng ↔ 1 dòng cuộn ngang,
    // nên phải tính lại xem có tràn hay không thì mũi tên mới hiện đúng.
  }, [checkScroll, stuck]);

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
    <>
      <nav
        ref={navRef}
        // pointer-events-auto: <header> đặt none để phần đệm trống không chặn
        // cú bấm vào nội dung bên dưới (xem chú thích ở site-header.tsx).
        //
        // Đổ bóng CHỈ khi đã dính, để tách thanh menu khỏi nội dung cuộn phía
        // dưới. Lúc chưa dính thì không đổ: khi đó nav còn nằm giữa header,
        // đổ bóng sẽ thành một vệt tối vô duyên cắt ngang thân header.
        // Bóng đặt trên <nav> chứ KHÔNG phải <header>: khung <header> thò
        // xuống thêm ~82px (phần ô đệm trong suốt), đổ ở đó thì bóng rơi lệch
        // hẳn xuống dưới, không dính đáy thanh đỏ.
        className={`pointer-events-auto border-t border-red-600/40 bg-red-800 ${
          stuck ? "shadow-lg shadow-black/25" : ""
        }`}
      >
        <div className="relative mx-auto flex w-full max-w-container items-center">
      {/* Nút trái — chỉ hiện trên mobile */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll("left")}
          className={`absolute left-0 z-10 flex h-full w-10 items-center justify-center bg-red-800 text-white shadow-[4px_0_8px_rgba(0,0,0,0.2)] transition hover:bg-red-700 ${
            // Lúc dính, desktop cũng cuộn ngang nên vẫn cần mũi tên.
            stuck ? "" : "md:hidden"
          }`}
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
        // Khi đã dính: desktop giữ MỘT dòng cuộn ngang thay vì xuống 3 dòng
        // (~123px) — nếu không sẽ chiếm hơn nửa màn hình. Mobile vốn đã 1 dòng.
        className={`flex w-full gap-px overflow-x-auto whitespace-nowrap px-2 text-sm ${
          stuck
            ? ""
            : "md:flex-wrap md:overflow-visible md:whitespace-normal"
        }`}
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
          className={`absolute right-0 z-10 flex h-full w-10 items-center justify-center bg-red-800 text-white shadow-[-4px_0_8px_rgba(0,0,0,0.2)] transition hover:bg-red-700 ${
            stuck ? "" : "md:hidden"
          }`}
          aria-label="Cuộn phải"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 0 1-1.06-1.06L11.44 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </button>
        )}
        </div>
      </nav>

      {/* Ô đệm giữ chỗ — bù đúng phần chiều cao hụt đi khi menu gom về 1 dòng,
          để tổng chiều cao trang không đổi (chống vòng lặp giật/nhấp nháy, xem
          chú thích effect ở trên). Trong suốt và aria-hidden nên không ai thấy,
          không trình đọc màn hình nào đọc phải.
          pointer-events-none là BẮT BUỘC: ô đệm nằm trong <header> đang dính,
          nên tuy vô hình nó vẫn phủ lên một dải ~82px của nội dung bên dưới và
          nuốt mất cú bấm (đo được: bấm ở y=46..118 trúng ô đệm thay vì trúng
          bài viết). */}
      {stuck && expandedH && collapsedH && expandedH > collapsedH && (
        <div
          aria-hidden="true"
          className="pointer-events-none"
          style={{ height: expandedH - collapsedH }}
        />
      )}
    </>
  );
}
