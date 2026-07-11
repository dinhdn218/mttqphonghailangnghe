import { Suspense } from "react";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Đăng nhập",
  // Không lập chỉ mục trang đăng nhập.
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-4 py-12">
      <div className="mb-6 text-center">
        <p className="text-sm font-medium text-red-700">MTTQ xã Phong Hải</p>
        <h1 className="mt-1 text-xl font-bold">Đăng nhập quản trị</h1>
      </div>
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
