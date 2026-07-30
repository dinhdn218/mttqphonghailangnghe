"use client";

import { useActionState, useEffect, useRef } from "react";
import { addToast } from "@heroui/react";
import { updateProfile, type ProfileState } from "./actions";

const INPUT =
  "w-full border border-gray-300 bg-white px-3 py-2.5 outline-none transition focus:border-red-600 focus:ring-1 focus:ring-red-600";

export function ProfileForm({ name }: { name: string }) {
  const [state, formAction, pending] = useActionState<ProfileState, FormData>(
    updateProfile,
    {},
  );
  const fe = state.fieldErrors ?? {};

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
    <form action={formAction} className="max-w-xl space-y-6">
      {/* Thanh lưu — dính đầu trang, đồng bộ với các module khác. */}
      <div className="sticky top-[var(--admin-header-h)] z-20 -mx-4 flex items-center gap-3 border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <button
          type="submit"
          disabled={pending}
          className="bg-red-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-800 disabled:opacity-60"
        >
          {pending ? "Đang lưu…" : "Lưu thay đổi"}
        </button>
      </div>

      {state.error && (
        <p className="border-l-4 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <Field label="Họ tên" error={fe.name}>
        <input name="name" type="text" defaultValue={name} className={INPUT} />
      </Field>

      <fieldset className="border border-gray-200 bg-white">
        <legend className="mx-4 px-2 text-sm font-bold tracking-wide text-red-800 uppercase">
          Đổi mật khẩu
        </legend>
        <div className="space-y-4 p-5">
          <p className="text-xs text-gray-400">
            Bỏ trống nếu không muốn đổi mật khẩu.
          </p>
          <Field label="Mật khẩu hiện tại" error={fe.currentPassword}>
            <input
              name="currentPassword"
              type="password"
              autoComplete="current-password"
              className={INPUT}
            />
          </Field>
          <Field
            label="Mật khẩu mới"
            error={fe.newPassword}
            hint="Tối thiểu 8 ký tự."
          >
            <input
              name="newPassword"
              type="password"
              autoComplete="new-password"
              className={INPUT}
            />
          </Field>
          <Field label="Xác nhận mật khẩu mới" error={fe.confirmPassword}>
            <input
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              className={INPUT}
            />
          </Field>
        </div>
      </fieldset>
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
