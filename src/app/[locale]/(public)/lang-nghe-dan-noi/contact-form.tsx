"use client";

import { useActionState, useState } from "react";
import { useTranslations } from "next-intl";
import { Turnstile } from "@marsidev/react-turnstile";
import { submitFeedback, type FeedbackState } from "./actions";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Ô nhập phẳng (không bo góc) + focus đỏ.
const INPUT =
  "w-full border border-gray-300 bg-white px-3 py-2.5 outline-none transition focus:border-red-600 focus:ring-1 focus:ring-red-600";

export function ContactForm() {
  const t = useTranslations("contact");
  const [state, formAction, pending] = useActionState<FeedbackState, FormData>(
    submitFeedback,
    {},
  );
  const [token, setToken] = useState("");

  const fieldErrors = state.fieldErrors ?? {};

  if (state.ok) {
    return (
      <div className="border border-green-200 bg-green-50 p-6 text-center">
        <p className="text-3xl text-green-600">✓</p>
        <p className="mt-2 font-medium text-green-800">{t("success")}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {/* Honeypot chống bot — ẩn với người dùng thật. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.error && (
        <p className="border-l-4 border-red-600 bg-red-50 px-4 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <div>
        <Label htmlFor="name">{t("name")} *</Label>
        <input id="name" name="name" required className={INPUT} />
        <ErrorText msg={fieldErrors.name} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">
            {t("phone")}{" "}
            <span className="text-gray-400">({t("optional")})</span>
          </Label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            className={INPUT}
          />
        </div>
        <div>
          <Label htmlFor="email">
            {t("email")}{" "}
            <span className="text-gray-400">({t("optional")})</span>
          </Label>
          <input id="email" name="email" type="email" className={INPUT} />
          <ErrorText msg={fieldErrors.email} />
        </div>
      </div>

      <div>
        <Label htmlFor="message">{t("message")} *</Label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className={INPUT}
        />
        <ErrorText msg={fieldErrors.message} />
      </div>

      {SITE_KEY && (
        <>
          <input type="hidden" name="turnstileToken" value={token} />
          <Turnstile
            siteKey={SITE_KEY}
            onSuccess={setToken}
            options={{ size: "flexible" }}
          />
        </>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-red-700 px-6 py-3 font-semibold text-white transition hover:bg-red-800 disabled:opacity-60 sm:w-auto"
      >
        {pending ? t("submitting") : t("submit")}
      </button>
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
