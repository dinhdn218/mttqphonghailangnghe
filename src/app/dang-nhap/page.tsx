import { Suspense } from "react";
import Link from "next/link";
import { Emblem } from "@/components/emblem";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Đăng nhập",
  // Không lập chỉ mục trang đăng nhập.
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-gradient-to-br from-red-900 via-red-800 to-red-950 px-4 py-10">
      {/* Sao thổ cẩm mờ trang trí */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="pointer-events-none absolute -top-16 -left-16 h-80 w-80 text-white/5"
        aria-hidden="true"
      >
        <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01z" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="pointer-events-none absolute -right-20 -bottom-20 h-96 w-96 text-white/5"
        aria-hidden="true"
      >
        <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01z" />
      </svg>

      <div className="relative w-full max-w-sm">
        <div className="bg-white shadow-2xl">
          {/* Đầu thẻ: quốc huy + tên cơ quan */}
          <div className="flex flex-col items-center gap-2 bg-red-800 px-6 py-7 text-center">
            <Emblem className="h-14 w-14" />
            <p className="mt-1 text-[11px] font-semibold tracking-[0.2em] text-amber-300 uppercase">
              Ủy ban MTTQ Việt Nam
            </p>
            <p className="text-base font-bold text-white">Xã Phong Hải</p>
          </div>

          {/* Vạch hoa văn thổ cẩm */}
          <div className="h-1.5 w-full bg-[repeating-linear-gradient(45deg,#f59e0b_0,#f59e0b_8px,#7f1d1d_8px,#7f1d1d_16px)]" />

          <div className="px-6 py-7">
            <h1 className="mb-1 text-lg font-bold text-red-800">
              Đăng nhập quản trị
            </h1>
            <p className="mb-5 text-sm text-gray-500">
              Dành cho cán bộ được cấp tài khoản.
            </p>
            <Suspense>
              <LoginForm />
            </Suspense>
          </div>
        </div>

        <Link
          href="/"
          className="mt-5 block text-center text-sm text-red-100 transition hover:text-amber-300"
        >
          ← Về trang thông tin
        </Link>
      </div>
    </main>
  );
}
