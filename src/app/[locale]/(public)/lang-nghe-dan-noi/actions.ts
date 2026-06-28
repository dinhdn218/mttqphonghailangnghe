"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyTurnstile } from "@/lib/turnstile";

export type FeedbackState = {
  ok?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

const schema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập họ tên"),
  phone: z.string().trim().max(20).optional(),
  email: z
    .string()
    .trim()
    .email("Email không hợp lệ")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().min(10, "Nội dung phản ánh quá ngắn"),
});

export async function submitFeedback(
  _prev: FeedbackState,
  formData: FormData,
): Promise<FeedbackState> {
  // 1) Honeypot: trường ẩn "company" phải trống. Bot thường điền hết.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { ok: true }; // giả thành công, không lưu
  }

  // 2) Captcha (nếu đã bật Turnstile)
  const hdrs = await headers();
  const ip =
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    hdrs.get("x-real-ip") ||
    undefined;
  const token = String(formData.get("turnstileToken") ?? "");
  const captchaOk = await verifyTurnstile(token, ip);
  if (!captchaOk) {
    return { error: "Xác minh captcha thất bại. Vui lòng thử lại." };
  }

  // 3) Validate
  const parsed = schema.safeParse({
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "");
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { fieldErrors };
  }
  const { name, phone, email, message } = parsed.data;

  // 4) Lưu vào DB để cán bộ xử lý trong CMS (không gửi email).
  try {
    await prisma.feedback.create({
      data: {
        name,
        phone: phone || null,
        email: email || null,
        message,
      },
    });
  } catch (e) {
    console.error("Lỗi lưu phản ánh:", e);
    return {
      error: "Không gửi được phản ánh lúc này. Vui lòng thử lại sau.",
    };
  }

  return { ok: true };
}
