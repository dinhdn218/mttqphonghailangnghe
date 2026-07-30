"use client";

import { useActionState, useEffect, useRef } from "react";
import { addToast } from "@heroui/react";
import { updateSettings, type SettingsFormState } from "./actions";

export type Field = {
  key: string;
  label: string;
  group: string;
  type: "text" | "textarea" | "url" | "email" | "tel";
  value: string;
  placeholder?: string;
  hint?: string;
};

const INPUT =
  "w-full border border-gray-300 bg-white px-3 py-2.5 outline-none transition focus:border-red-600 focus:ring-1 focus:ring-red-600";

export function SettingsForm({
  groups,
}: {
  groups: { name: string; fields: Field[] }[];
}) {
  const [state, formAction, pending] = useActionState<
    SettingsFormState,
    FormData
  >(updateSettings, {});
  const fe = state.fieldErrors ?? {};

  // Toast báo kết quả lưu — chỉ chạy khi `state` thực sự đổi sau khi submit.
  const lastState = useRef(state);
  useEffect(() => {
    if (state === lastState.current) return;
    lastState.current = state;

    if (state.success) {
      addToast({ title: "Đã lưu cấu hình.", color: "success" });
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
    <form action={formAction} className="max-w-full space-y-6">
      {/* Thanh lưu — dính đầu trang vì cấu hình có nhiều nhóm trường, form dài. */}
      <div className="sticky top-[var(--admin-header-h)] z-20 -mx-4 flex items-center gap-3 border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <button
          type="submit"
          disabled={pending}
          className="bg-red-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-800 disabled:opacity-60"
        >
          {pending ? "Đang lưu…" : "Lưu cấu hình"}
        </button>
      </div>

      {state.error && (
        <p className="border-l-4 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      {groups.map((g) => (
        <fieldset key={g.name} className="border border-gray-200 bg-white">
          <legend className="mx-4 px-2 text-sm font-bold tracking-wide text-red-800 uppercase">
            {g.name}
          </legend>
          <div className="space-y-4 p-5">
            {g.fields.map((f) => (
              <label key={f.key} className="block">
                <span className="mb-1.5 block text-sm font-medium text-gray-700">
                  {f.label}
                </span>
                {f.type === "textarea" ? (
                  <textarea
                    name={f.key}
                    defaultValue={f.value}
                    rows={2}
                    className={INPUT}
                    placeholder={f.placeholder}
                  />
                ) : (
                  <input
                    name={f.key}
                    type={f.type === "tel" ? "tel" : "text"}
                    defaultValue={f.value}
                    className={INPUT}
                    placeholder={f.placeholder}
                  />
                )}
                {fe[f.key] ? (
                  <span className="mt-1 block text-xs text-red-600">
                    {fe[f.key]}
                  </span>
                ) : f.hint ? (
                  <span className="mt-1 block text-xs text-gray-400">
                    {f.hint}
                  </span>
                ) : null}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
    </form>
  );
}
