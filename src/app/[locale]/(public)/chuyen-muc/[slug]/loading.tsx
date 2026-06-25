// Skeleton trang chuyên mục — khớp bố cục: header + bento (1 lớn + 2 phụ)
// + đường thổ cẩm + danh sách "Tin tức mới nhất".
export default function CategoryLoading() {
  return (
    <main className="mx-auto flex w-full max-w-container flex-col gap-8 px-4 py-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <div className="h-8 w-64 animate-pulse bg-gray-200" />
        <div className="mt-2 h-4 w-96 max-w-full animate-pulse bg-gray-200" />
      </div>

      {/* Bento nổi bật */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="h-80 w-full animate-pulse bg-gray-200 lg:col-span-8 lg:h-136" />
        <div className="flex flex-col gap-6 lg:col-span-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="border border-gray-200">
              <div className="aspect-video w-full animate-pulse bg-gray-200" />
              <div className="space-y-2 p-4">
                <div className="h-3 w-24 animate-pulse bg-gray-200" />
                <div className="h-4 w-full animate-pulse bg-gray-200" />
                <div className="h-3 w-20 animate-pulse bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Đường phân cách */}
      <div className="brocade-divider w-full" />

      {/* Danh sách tin mới nhất */}
      <section>
        <div className="mb-5 h-7 w-40 animate-pulse bg-gray-200" />
        <div className="flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 border border-gray-200 p-4 sm:flex-row sm:gap-6"
            >
              <div className="h-44 w-full shrink-0 animate-pulse bg-gray-200 sm:h-40 sm:w-64" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-28 animate-pulse bg-gray-200" />
                <div className="h-5 w-full animate-pulse bg-gray-200" />
                <div className="h-4 w-full animate-pulse bg-gray-200" />
                <div className="h-4 w-2/3 animate-pulse bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
