// Skeleton khi trang động đang tải — cải thiện cảm giác tốc độ trên mobile.
export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8">
      <div className="mb-6 h-7 w-48 animate-pulse rounded bg-gray-200" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white"
          >
            <div className="aspect-video w-full animate-pulse bg-gray-200" />
            <div className="space-y-2 p-4">
              <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
