"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { addToast } from "@heroui/react";
import { RichTextEditor } from "@/components/editor/rich-text-editor";
import { UploadButton } from "@/components/editor/upload-button";
import { createPost, updatePost, type FormState } from "./actions";

type Category = { id: string; nameVi: string };

type PostInitial = {
  id: string;
  titleVi: string;
  titleEn: string | null;
  excerptVi: string | null;
  excerptEn: string | null;
  contentVi: string;
  contentEn: string | null;
  coverImage: string | null;
  categoryId: string;
  featured: boolean;
};

type Props = {
  categories: Category[];
  post?: PostInitial;
};

export function PostForm({ categories, post }: Props) {
  const isEdit = !!post;
  const action = isEdit ? updatePost : createPost;
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    action,
    {},
  );

  const [contentVi, setContentVi] = useState(post?.contentVi ?? "");
  const [contentEn, setContentEn] = useState(post?.contentEn ?? "");
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");

  const fieldErrors = state.fieldErrors ?? {};

  // Toast báo kết quả lưu — chỉ chạy khi `state` thực sự đổi sau khi submit
  // (state ban đầu từ useActionState không có success/error nên không bắn toast).
  const lastState = useRef(state);
  useEffect(() => {
    if (state === lastState.current) return;
    lastState.current = state;

    if (state.success) {
      addToast({ title: "Đã lưu thay đổi.", color: "success" });
    } else if (state.error) {
      addToast({ title: state.error, color: "danger" });
    } else if (state.fieldErrors) {
      addToast({
        title: "Không lưu được — vui lòng kiểm tra lại thông tin.",
        color: "danger",
      });
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6">
      {isEdit && <input type="hidden" name="id" value={post.id} />}
      {/* Nội dung Tiptap được đồng bộ vào input ẩn để gửi kèm form. */}
      <input type="hidden" name="contentVi" value={contentVi} />
      <input type="hidden" name="contentEn" value={contentEn} />

      {/* Thanh lưu — dính đầu trang (dưới header admin) vì form soạn bài rất dài. */}
      <div className="sticky top-[var(--admin-header-h)] z-20 -mx-4 flex items-center gap-3 border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-red-700 px-5 py-2.5 font-medium text-white transition hover:bg-red-800 disabled:opacity-60"
        >
          {pending ? "Đang lưu…" : isEdit ? "Lưu thay đổi" : "Tạo bài (lưu nháp)"}
        </button>
        <Link
          href="/admin/bai-viet"
          className="text-sm text-gray-600 hover:underline"
        >
          Huỷ
        </Link>
      </div>

      {state.error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <div>
        <Label htmlFor="categoryId">Chuyên mục *</Label>
        <select
          id="categoryId"
          name="categoryId"
          defaultValue={post?.categoryId ?? ""}
          className="w-full rounded-lg border border-gray-300 px-3 py-2"
        >
          <option value="" disabled>
            — Chọn chuyên mục —
          </option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nameVi}
            </option>
          ))}
        </select>
        <ErrorText msg={fieldErrors.categoryId} />
      </div>

      {/* Ảnh bìa — upload lên Cloudinary. URL lưu vào input ẩn. */}
      <div>
        <Label htmlFor="coverImage">Ảnh bìa</Label>
        <input type="hidden" name="coverImage" value={coverImage} />

        {coverImage && (
          <div className="relative mb-2 aspect-video w-full max-w-md overflow-hidden border border-gray-200 bg-gray-100">
            <Image
              src={coverImage}
              alt="Ảnh bìa"
              fill
              sizes="(max-width: 768px) 100vw, 448px"
              className="object-cover"
            />
          </div>
        )}

        {/* UploadButton LUÔN ở cùng vị trí trong cây (chỉ đổi nhãn) — nếu render
            ở hai nhánh khác nhau, đổi state sẽ unmount widget Cloudinary đang mở
            và làm kẹt overlay + khoá cuộn trang. */}
        <div className="flex gap-2">
          <UploadButton
            label={coverImage ? "Đổi ảnh" : "Tải ảnh bìa lên"}
            onUploaded={(r) => setCoverImage(r.url)}
          />
          {coverImage && (
            <button
              type="button"
              onClick={() => setCoverImage("")}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Xoá ảnh
            </button>
          )}
        </div>
        <ErrorText msg={fieldErrors.coverImage} />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={post?.featured ?? false}
          className="h-4 w-4 rounded border-gray-300 text-red-700 focus:ring-red-500"
        />
        <span className="font-medium">Bài nổi bật</span>
        <span className="text-gray-400">
          (hiển thị ở khối đầu trang chủ)
        </span>
      </label>

      {/* --- Tiếng Việt --- */}
      <fieldset className="space-y-4 rounded-xl border border-gray-200 p-4">
        <legend className="px-2 text-sm font-semibold text-gray-700">
          Tiếng Việt
        </legend>

        <div>
          <Label htmlFor="titleVi">Tiêu đề *</Label>
          <input
            id="titleVi"
            name="titleVi"
            defaultValue={post?.titleVi ?? ""}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
          <ErrorText msg={fieldErrors.titleVi} />
        </div>

        <div>
          <Label htmlFor="excerptVi">Tóm tắt</Label>
          <textarea
            id="excerptVi"
            name="excerptVi"
            rows={2}
            defaultValue={post?.excerptVi ?? ""}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <Label htmlFor="contentVi">Nội dung *</Label>
          <RichTextEditor value={contentVi} onChange={setContentVi} />
          <ErrorText msg={fieldErrors.contentVi} />
        </div>
      </fieldset>

      {/* --- Tiếng Anh (tuỳ chọn) --- */}
      <fieldset className="space-y-4 rounded-xl border border-gray-200 p-4">
        <legend className="px-2 text-sm font-semibold text-gray-700">
          Tiếng Anh (tuỳ chọn)
        </legend>

        <div>
          <Label htmlFor="titleEn">Title</Label>
          <input
            id="titleEn"
            name="titleEn"
            defaultValue={post?.titleEn ?? ""}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <Label htmlFor="excerptEn">Summary</Label>
          <textarea
            id="excerptEn"
            name="excerptEn"
            rows={2}
            defaultValue={post?.excerptEn ?? ""}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <Label htmlFor="contentEn">Content</Label>
          <RichTextEditor
            value={contentEn}
            onChange={setContentEn}
            placeholder="English content…"
          />
        </div>
      </fieldset>
    </form>
  );
}

function Label({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium">
      {children}
    </label>
  );
}

function ErrorText({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-sm text-red-600">{msg}</p>;
}
