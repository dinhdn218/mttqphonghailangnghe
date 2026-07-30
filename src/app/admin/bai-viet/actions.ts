"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth-guards";
import { uniquePostSlug } from "@/lib/slug";
import { PostStatus } from "@/generated/prisma/client";
import {
  canCreatePost,
  canEditPost,
  canSubmitForReview,
  canReview,
  canUnpublish,
  canDeletePost,
} from "@/lib/post-permissions";

export type FormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
  success?: boolean;
};

const postSchema = z.object({
  titleVi: z.string().trim().min(1, "Vui lòng nhập tiêu đề (tiếng Việt)"),
  titleEn: z.string().trim().optional(),
  excerptVi: z.string().trim().optional(),
  excerptEn: z.string().trim().optional(),
  contentVi: z.string(),
  contentEn: z.string().optional(),
  coverImage: z
    .string()
    .trim()
    .url("Đường dẫn ảnh không hợp lệ")
    .optional()
    .or(z.literal("")),
  categoryId: z.string().min(1, "Vui lòng chọn chuyên mục"),
});

// Tiptap trống trả về "<p></p>" — coi như chưa có nội dung.
function isBlankHtml(html: string): boolean {
  return html.replace(/<[^>]*>/g, "").trim().length === 0;
}

function parseForm(formData: FormData) {
  const raw = {
    titleVi: String(formData.get("titleVi") ?? ""),
    titleEn: String(formData.get("titleEn") ?? ""),
    excerptVi: String(formData.get("excerptVi") ?? ""),
    excerptEn: String(formData.get("excerptEn") ?? ""),
    contentVi: String(formData.get("contentVi") ?? ""),
    contentEn: String(formData.get("contentEn") ?? ""),
    coverImage: String(formData.get("coverImage") ?? ""),
    categoryId: String(formData.get("categoryId") ?? ""),
  };
  return postSchema.safeParse(raw);
}

// ---------------------------------------------------------------------------
// Tạo bài (lưu nháp)
// ---------------------------------------------------------------------------
export async function createPost(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const user = await requireUser();
  if (!canCreatePost(user)) return { error: "Bạn không có quyền tạo bài." };

  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { fieldErrors: fieldErrorsOf(parsed.error) };
  }
  const data = parsed.data;
  if (isBlankHtml(data.contentVi)) {
    return { fieldErrors: { contentVi: "Vui lòng nhập nội dung" } };
  }

  const slug = await uniquePostSlug(data.titleVi);
  const post = await prisma.post.create({
    data: {
      slug,
      titleVi: data.titleVi,
      titleEn: emptyToNull(data.titleEn),
      excerptVi: emptyToNull(data.excerptVi),
      excerptEn: emptyToNull(data.excerptEn),
      contentVi: data.contentVi,
      contentEn: emptyToNull(data.contentEn),
      coverImage: emptyToNull(data.coverImage),
      featured: formData.get("featured") === "on",
      categoryId: data.categoryId,
      authorId: user.id,
      status: PostStatus.DRAFT,
    },
  });

  revalidatePath("/admin/bai-viet");
  redirect(`/admin/bai-viet/${post.id}`);
}

// ---------------------------------------------------------------------------
// Cập nhật bài
// ---------------------------------------------------------------------------
export async function updatePost(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const user = await requireUser();
  const id = String(formData.get("id") ?? "");
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return { error: "Không tìm thấy bài viết." };
  if (!canEditPost(user, post)) return { error: "Bạn không có quyền sửa bài này." };

  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { fieldErrors: fieldErrorsOf(parsed.error) };
  }
  const data = parsed.data;
  if (isBlankHtml(data.contentVi)) {
    return { fieldErrors: { contentVi: "Vui lòng nhập nội dung" } };
  }

  // Giữ slug cũ để không gãy URL; chỉ đổi nếu tiêu đề đổi và slug rảnh.
  await prisma.post.update({
    where: { id },
    data: {
      titleVi: data.titleVi,
      titleEn: emptyToNull(data.titleEn),
      excerptVi: emptyToNull(data.excerptVi),
      excerptEn: emptyToNull(data.excerptEn),
      contentVi: data.contentVi,
      contentEn: emptyToNull(data.contentEn),
      coverImage: emptyToNull(data.coverImage),
      featured: formData.get("featured") === "on",
      categoryId: data.categoryId,
    },
  });

  revalidatePublic(post.slug, post.status);
  revalidatePath(`/admin/bai-viet/${id}`);
  return { success: true };
}

// ---------------------------------------------------------------------------
// Luồng duyệt
// ---------------------------------------------------------------------------
export async function submitForReview(formData: FormData) {
  const user = await requireUser();
  const id = String(formData.get("id") ?? "");
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post || !canSubmitForReview(user, post)) return;

  await prisma.post.update({
    where: { id },
    data: { status: PostStatus.PENDING, reviewNote: null },
  });
  revalidatePath("/admin/bai-viet");
  revalidatePath(`/admin/bai-viet/${id}`);
  redirect(`/admin/bai-viet/${id}?done=submitted`);
}

export async function approvePost(formData: FormData) {
  const user = await requireUser();
  const id = String(formData.get("id") ?? "");
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post || !canReview(user, post)) return;

  await prisma.post.update({
    where: { id },
    data: {
      status: PostStatus.PUBLISHED,
      reviewedById: user.id,
      reviewNote: null,
      publishedAt: post.publishedAt ?? new Date(),
    },
  });
  revalidatePublic(post.slug, PostStatus.PUBLISHED);
  revalidatePath("/admin/bai-viet");
  revalidatePath(`/admin/bai-viet/${id}`);
  redirect(`/admin/bai-viet/${id}?done=approved`);
}

export async function rejectPost(formData: FormData) {
  const user = await requireUser();
  const id = String(formData.get("id") ?? "");
  const note = String(formData.get("reviewNote") ?? "").trim();
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post || !canReview(user, post)) return;

  await prisma.post.update({
    where: { id },
    data: {
      status: PostStatus.REJECTED,
      reviewedById: user.id,
      reviewNote: note || "Cần chỉnh sửa.",
    },
  });
  revalidatePath("/admin/bai-viet");
  revalidatePath(`/admin/bai-viet/${id}`);
  redirect(`/admin/bai-viet/${id}?done=rejected`);
}

export async function unpublishPost(formData: FormData) {
  const user = await requireUser();
  const id = String(formData.get("id") ?? "");
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post || !canUnpublish(user, post)) return;

  await prisma.post.update({
    where: { id },
    data: { status: PostStatus.DRAFT },
  });
  revalidatePublic(post.slug, PostStatus.PUBLISHED);
  revalidatePath("/admin/bai-viet");
  revalidatePath(`/admin/bai-viet/${id}`);
  redirect(`/admin/bai-viet/${id}?done=unpublished`);
}

export async function deletePost(formData: FormData) {
  const user = await requireUser();
  const id = String(formData.get("id") ?? "");
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post || !canDeletePost(user, post)) return;

  await prisma.post.delete({ where: { id } });
  revalidatePublic(post.slug, post.status);
  revalidatePath("/admin/bai-viet");
  redirect("/admin/bai-viet?deleted=1");
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function emptyToNull(v: string | undefined): string | null {
  const t = (v ?? "").trim();
  return t.length === 0 ? null : t;
}

function fieldErrorsOf(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

function revalidatePublic(slug: string, status: PostStatus) {
  // Chỉ cần làm mới trang công khai khi bài đang/đã ở trạng thái đăng.
  revalidatePath("/");
  revalidatePath(`/bai-viet/${slug}`);
  if (status === PostStatus.PUBLISHED) {
    revalidatePath("/chuyen-muc", "layout");
  }
}
