import Link from "next/link";

// 404 cấp ứng dụng (route không khớp ngoài [locale]). Mặc định tiếng Việt.
export default function RootNotFound() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-5xl font-bold text-red-700">404</p>
      <h1 className="mt-4 text-xl font-bold">Không tìm thấy trang</h1>
      <p className="mt-2 text-gray-600">
        Trang bạn tìm không tồn tại hoặc đã được di chuyển.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-red-700 px-5 py-2.5 font-medium text-white transition hover:bg-red-800"
      >
        Về trang chủ
      </Link>
    </main>
  );
}
