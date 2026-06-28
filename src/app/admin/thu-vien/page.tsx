import Image from "next/image";
import Link from "next/link";
import { requireUser } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { AdminSearch } from "@/components/admin/admin-search";
import { MediaUploader } from "./media-uploader";
import { CopyUrl } from "./copy-url";
import { deleteMedia } from "./actions";

const PAGE_SIZE = 24;

type Props = { searchParams: Promise<{ q?: string; page?: string }> };

export default async function MediaLibraryPage({ searchParams }: Props) {
  await requireUser();
  const sp = await searchParams;
  const q = sp.q?.trim() || undefined;
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);

  const where = q
    ? {
        OR: [
          { alt: { contains: q, mode: "insensitive" as const } },
          {
            post: {
              is: { titleVi: { contains: q, mode: "insensitive" as const } },
            },
          },
        ],
      }
    : {};

  const [items, total] = await Promise.all([
    prisma.media.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        uploadedBy: { select: { name: true, email: true } },
        post: { select: { id: true, titleVi: true } },
      },
    }),
    prisma.media.count({ where }),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Thư viện media</h1>
          <p className="mt-1 text-sm text-gray-500">
            Ảnh và video đã tải lên Cloudinary. Tổng {total} mục.
          </p>
        </div>
        <MediaUploader />
      </div>

      <AdminSearch
        basePath="/admin/thu-vien"
        defaultValue={q}
        placeholder="Tìm theo mô tả hoặc tên bài…"
      />

      {items.length === 0 ? (
        <p className="border border-gray-200 bg-white p-6 text-center text-gray-500">
          Chưa có media nào. Bấm “Tải media lên” để thêm.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((m) => (
            <div
              key={m.id}
              className="flex flex-col border border-gray-200 bg-white"
            >
              <a
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block aspect-square bg-gray-100"
              >
                {m.type === "VIDEO" ? (
                  <video
                    src={m.url}
                    className="h-full w-full object-cover"
                    muted
                  />
                ) : (
                  <Image
                    src={m.url}
                    alt={m.alt ?? ""}
                    fill
                    sizes="(max-width: 640px) 50vw, 200px"
                    className="object-cover"
                  />
                )}
                {m.type === "VIDEO" && (
                  <span className="absolute right-1.5 bottom-1.5 bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
                    VIDEO
                  </span>
                )}
              </a>

              <div className="flex flex-1 flex-col gap-1 p-2 text-xs">
                <span className="text-gray-400">{formatDate(m.createdAt)}</span>
                {m.post ? (
                  <Link
                    href={`/admin/bai-viet/${m.post.id}`}
                    className="line-clamp-1 text-gray-600 hover:text-red-700"
                    title={m.post.titleVi}
                  >
                    📄 {m.post.titleVi}
                  </Link>
                ) : (
                  <span className="text-gray-400">Chưa gắn bài</span>
                )}
                <div className="mt-auto flex items-center justify-between pt-1">
                  <CopyUrl url={m.url} />
                  <form action={deleteMedia}>
                    <input type="hidden" name="id" value={m.id} />
                    <button
                      type="submit"
                      className="text-gray-400 hover:text-red-600"
                    >
                      Xoá
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <AdminPagination
          page={page}
          totalPages={totalPages}
          basePath="/admin/thu-vien"
          summary={`${total} mục`}
          params={{ q }}
        />
      )}
    </div>
  );
}
