"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createUser, updateUser, type UserFormState } from "./actions";

type UserInitial = {
  id: string;
  name: string | null;
  email: string;
  role: string;
};

const ROLE_OPTIONS = [
  { value: "ADMIN", label: "Quản trị — toàn quyền, quản lý người dùng" },
  { value: "EDITOR", label: "Biên tập — soạn/sửa bài, gửi duyệt" },
  { value: "APPROVER", label: "Duyệt — duyệt hoặc trả lại bài" },
];

const INPUT =
  "w-full border border-gray-300 bg-white px-3 py-2.5 outline-none transition focus:border-red-600 focus:ring-1 focus:ring-red-600";

export function UserForm({ user }: { user?: UserInitial }) {
  const isEdit = !!user;
  const action = isEdit ? updateUser : createUser;
  const [state, formAction, pending] = useActionState<UserFormState, FormData>(
    action,
    {},
  );

  const fe = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      {isEdit && <input type="hidden" name="id" value={user.id} />}

      {state.error && (
        <p className="border-l-4 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <Field label="Họ tên" error={fe.name}>
        <input
          name="name"
          type="text"
          defaultValue={user?.name ?? ""}
          className={INPUT}
          autoComplete="off"
        />
      </Field>

      <Field label="Email" error={fe.email}>
        <input
          name="email"
          type="email"
          defaultValue={user?.email ?? ""}
          className={INPUT}
          autoComplete="off"
        />
      </Field>

      <Field
        label={isEdit ? "Mật khẩu mới" : "Mật khẩu"}
        error={fe.password}
        hint={
          isEdit
            ? "Để trống nếu không đổi mật khẩu."
            : "Tối thiểu 8 ký tự."
        }
      >
        <input
          name="password"
          type="password"
          className={INPUT}
          autoComplete="new-password"
          placeholder={isEdit ? "••••••••" : ""}
        />
      </Field>

      <Field label="Vai trò" error={fe.role}>
        <select
          name="role"
          defaultValue={user?.role ?? "EDITOR"}
          className={INPUT}
        >
          {ROLE_OPTIONS.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </Field>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="bg-red-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-800 disabled:opacity-60"
        >
          {pending ? "Đang lưu…" : isEdit ? "Lưu thay đổi" : "Tạo tài khoản"}
        </button>
        <Link
          href="/admin/nguoi-dung"
          className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          Huỷ
        </Link>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </span>
      {children}
      {error ? (
        <span className="mt-1 block text-xs text-red-600">{error}</span>
      ) : hint ? (
        <span className="mt-1 block text-xs text-gray-400">{hint}</span>
      ) : null}
    </label>
  );
}
