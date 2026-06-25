// Skeleton trang chủ — khớp bố cục: khối nổi bật (hero + 2 thẻ | hộp tiêu điểm)
// + đường thổ cẩm + lưới 2 cột chuyên mục.
export default function HomeLoading() {
  return (
    <main className="mx-auto w-full max-w-container px-4 py-8">
      {/* Khối nổi bật */}
      <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Cột trái: hero + 2 thẻ */}
        <div className="flex flex-col gap-5 lg:col-span-8">
          <div className="h-72 w-full animate-pulse bg-gray-200 sm:h-100" />
          <div className="grid gap-5 sm:grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="aspect-3/2 w-full animate-pulse bg-gray-200" />
                <div className="h-4 w-full animate-pulse bg-gray-200" />
                <div className="h-4 w-2/3 animate-pulse bg-gray-200" />
              </div>
            ))}
          </div>
        </div>

        {/* Cột phải: hộp tiêu điểm */}
        <div className="border border-gray-200 bg-gray-50/60 p-4 lg:col-span-4">
          <div className="mb-3 h-6 w-32 animate-pulse bg-gray-200" />
          <div className="flex flex-col divide-y divide-gray-200">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3 py-3">
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-4 w-full animate-pulse bg-gray-200" />
                  <div className="h-3 w-16 animate-pulse bg-gray-200" />
                </div>
                <div className="h-16 w-20 shrink-0 animate-pulse bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Đường phân cách */}
      <div className="brocade-divider my-8 w-full" />

      {/* Lưới chuyên mục */}
      <div className="grid gap-x-10 gap-y-10 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <section key={i} className="flex flex-col gap-4">
            <div className="h-7 w-48 animate-pulse bg-gray-200" />
            <div className="grid gap-5 sm:grid-cols-2">
              {Array.from({ length: 2 }).map((_, j) => (
                <div key={j} className="space-y-2">
                  <div className="aspect-video w-full animate-pulse bg-gray-200" />
                  <div className="h-4 w-full animate-pulse bg-gray-200" />
                  <div className="h-4 w-1/2 animate-pulse bg-gray-200" />
                </div>
              ))}
            </div>
            <div className="space-y-2.5 border-t border-gray-200 pt-4">
              {Array.from({ length: 4 }).map((_, k) => (
                <div key={k} className="h-4 w-full animate-pulse bg-gray-200" />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
