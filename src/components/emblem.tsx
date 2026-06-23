// Biểu trưng tạm: sao vàng trên nền đỏ (gợi quốc huy/cờ Tổ quốc).
// Có thể thay bằng ảnh quốc huy / logo MTTQ chính thức sau.
export function Emblem({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-red-800 ring-2 ring-yellow-400/80 ${
        className ?? "h-12 w-12"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-2/3 w-2/3"
        fill="#facc15"
        aria-hidden="true"
      >
        <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01z" />
      </svg>
    </span>
  );
}
