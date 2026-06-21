import { PostStatus, Role } from "@/generated/prisma/client";

// Quy tắc phân quyền theo 3 vai (CLAUDE.md mục 5):
// - ADMIN (Quản trị): toàn quyền.
// - EDITOR (Biên tập): soạn/sửa bài của mình, gửi duyệt. KHÔNG tự đăng.
// - APPROVER (Duyệt): duyệt/trả lại bài đang chờ. KHÔNG soạn nội dung.

type SessionUser = { id: string; role: Role };
type PostLike = { authorId: string; status: PostStatus };

export function canCreatePost(user: SessionUser): boolean {
  return user.role === Role.ADMIN || user.role === Role.EDITOR;
}

// Sửa nội dung: ADMIN sửa mọi bài; tác giả sửa bài của mình khi chưa đăng
// (nháp / bị trả lại / chờ duyệt).
export function canEditPost(user: SessionUser, post: PostLike): boolean {
  if (user.role === Role.ADMIN) return true;
  const isAuthor = post.authorId === user.id;
  const editableStatuses: PostStatus[] = [
    PostStatus.DRAFT,
    PostStatus.REJECTED,
    PostStatus.PENDING,
  ];
  return isAuthor && editableStatuses.includes(post.status);
}

// Gửi duyệt: tác giả (hoặc ADMIN) khi bài đang nháp / bị trả lại.
export function canSubmitForReview(user: SessionUser, post: PostLike): boolean {
  const canAct = user.role === Role.ADMIN || post.authorId === user.id;
  return (
    canAct &&
    (post.status === PostStatus.DRAFT || post.status === PostStatus.REJECTED)
  );
}

// Duyệt / trả lại: APPROVER hoặc ADMIN, bài phải đang chờ duyệt.
export function canReview(user: SessionUser, post: PostLike): boolean {
  const isReviewer = user.role === Role.APPROVER || user.role === Role.ADMIN;
  return isReviewer && post.status === PostStatus.PENDING;
}

// Gỡ đăng: ADMIN, bài đang đăng.
export function canUnpublish(user: SessionUser, post: PostLike): boolean {
  return user.role === Role.ADMIN && post.status === PostStatus.PUBLISHED;
}

// Xoá: ADMIN xoá mọi bài; tác giả xoá bài nháp của mình.
export function canDeletePost(user: SessionUser, post: PostLike): boolean {
  if (user.role === Role.ADMIN) return true;
  return post.authorId === user.id && post.status === PostStatus.DRAFT;
}
