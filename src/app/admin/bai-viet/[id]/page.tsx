import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { requireUser } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { PostForm } from "../post-form";
import { StatusBadge } from "@/components/admin/status-badge";
import { WorkflowPanel } from "./workflow-panel";
import {
  canEditPost,
  canReview,
  canSubmitForReview,
  canUnpublish,
  canDeletePost,
} from "@/lib/post-permissions";
import { sanitizePostHtml } from "@/lib/sanitize";
import { Role, PostStatus } from "@/generated/prisma/client";

type Props = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Props) {
  const user = await requireUser();
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
    include: { category: { select: { nameVi: true } } },
  });
  if (!post) notFound();

  const editable = canEditPost(user, post);
  const isReviewer = user.role === Role.APPROVER || user.role === Role.ADMIN;
  const isAuthor = post.authorId === user.id;

  // Biên tập viên không phải tác giả thì không được xem bài người khác.
  if (!editable && !isReviewer && !isAuthor) redirect("/admin/bai-viet");

  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    select: { id: true, nameVi: true },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <Link
            href="/admin/bai-viet"
            className="text-sm text-gray-500 hover:underline"
          >
            ← Danh sách bài viết
          </Link>
          <h1 className="mt-1 text-2xl font-bold">Sửa bài viết</h1>
        </div>
        <StatusBadge status={post.status} />
      </div>

      {post.status === PostStatus.REJECTED && post.reviewNote && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <strong>Bị trả lại:</strong> {post.reviewNote}
        </div>
      )}

      {post.status === PostStatus.PUBLISHED && (
        <p className="mb-6 text-sm">
          <Link
            href={`/bai-viet/${post.slug}`}
            target="_blank"
            className="text-red-700 hover:underline"
          >
            Xem bài đã đăng ↗
          </Link>
        </p>
      )}

      <WorkflowPanel
        postId={post.id}
        canSubmit={canSubmitForReview(user, post)}
        canReview={canReview(user, post)}
        canUnpublish={canUnpublish(user, post)}
        canDelete={canDeletePost(user, post)}
      />

      {editable ? (
        <PostForm categories={categories} post={post} />
      ) : (
        <ReadOnlyPreview
          titleVi={post.titleVi}
          contentVi={post.contentVi}
        />
      )}
    </div>
  );
}

function ReadOnlyPreview({
  titleVi,
  contentVi,
}: {
  titleVi: string;
  contentVi: string;
}) {
  return (
    <article className="rounded-xl border border-gray-200 p-5">
      <p className="mb-2 text-xs text-gray-400">
        Chế độ xem (bạn không có quyền sửa nội dung này)
      </p>
      <h2 className="text-xl font-bold">{titleVi}</h2>
      <div
        className="prose prose-red mt-3 max-w-none"
        dangerouslySetInnerHTML={{ __html: sanitizePostHtml(contentVi) }}
      />
    </article>
  );
}
