import {
  submitForReview,
  approvePost,
  rejectPost,
  unpublishPost,
  deletePost,
} from "../actions";

type Props = {
  postId: string;
  canSubmit: boolean;
  canReview: boolean;
  canUnpublish: boolean;
  canDelete: boolean;
};

export function WorkflowPanel({
  postId,
  canSubmit,
  canReview,
  canUnpublish,
  canDelete,
}: Props) {
  if (!canSubmit && !canReview && !canUnpublish && !canDelete) return null;

  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
      <p className="mb-3 text-sm font-semibold text-gray-700">Thao tác</p>
      <div className="flex flex-wrap items-start gap-3">
        {canSubmit && (
          <form action={submitForReview}>
            <input type="hidden" name="id" value={postId} />
            <button
              type="submit"
              className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-700"
            >
              Gửi duyệt
            </button>
          </form>
        )}

        {canReview && (
          <>
            <form action={approvePost}>
              <input type="hidden" name="id" value={postId} />
              <button
                type="submit"
                className="rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-800"
              >
                Duyệt &amp; đăng
              </button>
            </form>

            <details className="group">
              <summary className="cursor-pointer list-none rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50">
                Trả lại…
              </summary>
              <form
                action={rejectPost}
                className="mt-2 w-72 rounded-lg border border-gray-200 bg-white p-3"
              >
                <input type="hidden" name="id" value={postId} />
                <label
                  htmlFor="reviewNote"
                  className="mb-1 block text-xs font-medium text-gray-600"
                >
                  Lý do / ghi chú cho biên tập
                </label>
                <textarea
                  id="reviewNote"
                  name="reviewNote"
                  rows={3}
                  required
                  className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                  placeholder="Cần sửa lại tiêu đề, bổ sung ảnh…"
                />
                <button
                  type="submit"
                  className="mt-2 rounded-lg bg-red-700 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-800"
                >
                  Xác nhận trả lại
                </button>
              </form>
            </details>
          </>
        )}

        {canUnpublish && (
          <form action={unpublishPost}>
            <input type="hidden" name="id" value={postId} />
            <button
              type="submit"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Gỡ đăng
            </button>
          </form>
        )}

        {canDelete && (
          <details className="group ml-auto">
            <summary className="cursor-pointer list-none rounded-lg px-4 py-2 text-sm font-medium text-gray-500 transition hover:text-red-700">
              Xoá bài…
            </summary>
            <form
              action={deletePost}
              className="mt-2 rounded-lg border border-red-200 bg-white p-3"
            >
              <input type="hidden" name="id" value={postId} />
              <p className="mb-2 text-xs text-gray-600">
                Hành động không thể hoàn tác.
              </p>
              <button
                type="submit"
                className="rounded-lg bg-red-700 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-800"
              >
                Xác nhận xoá
              </button>
            </form>
          </details>
        )}
      </div>
    </div>
  );
}
