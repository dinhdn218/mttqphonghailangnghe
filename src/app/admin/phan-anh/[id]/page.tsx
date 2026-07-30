import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { ToastFromParams } from "@/components/admin/toast-from-params";
import { setFeedbackStatus, deleteFeedback } from "../actions";
import { FeedbackBadge } from "../page";

type Props = { params: Promise<{ id: string }> };

export default async function FeedbackDetailPage({ params }: Props) {
  await requireUser();
  const { id } = await params;

  const f = await prisma.feedback.findUnique({ where: { id } });
  if (!f) notFound();

  const isNew = f.status === "NEW";

  return (
    <div className="max-w-2xl space-y-4">
      <ToastFromParams
        toasts={[{ param: "updated", message: "Đã cập nhật trạng thái.", color: "success" }]}
      />

      <Link
        href="/admin/phan-anh"
        className="text-sm text-gray-500 hover:text-red-700"
      >
        ← Phản ánh người dân
      </Link>

      <div className="border border-gray-200 bg-white">
        {/* Đầu thẻ */}
        <div className="flex items-start justify-between gap-3 border-b border-gray-100 p-5">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{f.name}</h1>
            <p className="mt-1 text-xs text-gray-400">
              Gửi lúc {formatDate(f.createdAt)}
            </p>
          </div>
          <FeedbackBadge status={f.status} />
        </div>

        {/* Liên hệ */}
        <dl className="grid gap-3 border-b border-gray-100 p-5 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
              Điện thoại
            </dt>
            <dd className="mt-0.5">
              {f.phone ? (
                <a
                  href={`tel:${f.phone.replace(/\s/g, "")}`}
                  className="font-medium text-red-700 hover:underline"
                >
                  {f.phone}
                </a>
              ) : (
                <span className="text-gray-400">—</span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
              Email
            </dt>
            <dd className="mt-0.5">
              {f.email ? (
                <a
                  href={`mailto:${f.email}`}
                  className="font-medium break-all text-red-700 hover:underline"
                >
                  {f.email}
                </a>
              ) : (
                <span className="text-gray-400">—</span>
              )}
            </dd>
          </div>
        </dl>

        {/* Nội dung */}
        <div className="p-5">
          <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
            Nội dung phản ánh
          </p>
          <p className="mt-2 whitespace-pre-wrap text-gray-800">{f.message}</p>
        </div>

        {/* Hành động */}
        <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 bg-gray-50 p-5">
          <form action={setFeedbackStatus}>
            <input type="hidden" name="id" value={f.id} />
            <input
              type="hidden"
              name="status"
              value={isNew ? "RESOLVED" : "NEW"}
            />
            <button
              type="submit"
              className={`px-4 py-2 text-sm font-medium text-white transition ${
                isNew
                  ? "bg-green-700 hover:bg-green-800"
                  : "bg-amber-600 hover:bg-amber-700"
              }`}
            >
              {isNew ? "Đánh dấu đã xử lý" : "Mở lại (chưa xử lý)"}
            </button>
          </form>

          <form action={deleteFeedback} className="ml-auto">
            <input type="hidden" name="id" value={f.id} />
            <button
              type="submit"
              className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-red-300 hover:text-red-700"
            >
              Xoá
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
