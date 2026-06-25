// Skeleton trang chi tiết — khớp bố cục: breadcrumb + 2 cột (bài viết | sidebar).
export default function PostLoading() {
  return (
    <main className="mx-auto w-full max-w-container px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 h-4 w-72 max-w-full animate-pulse bg-gray-200" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Bài viết */}
        <div className="border border-gray-200 bg-white p-5 sm:p-6 lg:col-span-8">
          <div className="mb-3 h-6 w-28 animate-pulse bg-gray-200" />
          <div className="space-y-3">
            <div className="h-8 w-full animate-pulse bg-gray-200" />
            <div className="h-8 w-3/4 animate-pulse bg-gray-200" />
          </div>
          <div className="mt-4 flex gap-4 border-y border-gray-200 py-3">
            <div className="h-4 w-28 animate-pulse bg-gray-200" />
            <div className="h-4 w-24 animate-pulse bg-gray-200" />
          </div>
          <div className="mt-8 aspect-video w-full animate-pulse bg-gray-200" />
          <div className="mt-8 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`h-4 animate-pulse bg-gray-200 ${
                  i % 4 === 3 ? "w-2/3" : "w-full"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6 lg:col-span-4">
          <div className="border border-gray-200 bg-white p-4">
            <div className="mb-4 h-6 w-36 animate-pulse bg-gray-200" />
            <div className="flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="h-20 w-20 shrink-0 animate-pulse bg-gray-200" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-4 w-full animate-pulse bg-gray-200" />
                    <div className="h-4 w-2/3 animate-pulse bg-gray-200" />
                    <div className="h-3 w-16 animate-pulse bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-gray-200 bg-red-50 p-4">
            <div className="h-6 w-40 animate-pulse bg-red-100" />
            <div className="mt-2 h-4 w-full animate-pulse bg-red-100" />
            <div className="mt-4 h-10 w-full animate-pulse bg-red-200" />
          </div>
        </div>
      </div>
    </main>
  );
}
