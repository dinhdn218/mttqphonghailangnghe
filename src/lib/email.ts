import { Resend } from "resend";

// Khởi tạo Resend khi cần (lazy) — tránh lỗi khi thiếu API key lúc build.
let resendClient: Resend | null = null;

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!resendClient) resendClient = new Resend(key);
  return resendClient;
}

export type SendEmailInput = {
  subject: string;
  html: string;
  replyTo?: string;
};

// Gửi email phản ánh về hộp thư của xã (CONTACT_INBOX_EMAIL).
// Trả về true nếu gửi thành công; false nếu chưa cấu hình hoặc lỗi.
export async function sendFeedbackEmail(
  input: SendEmailInput,
): Promise<boolean> {
  const resend = getResend();
  const to = process.env.CONTACT_INBOX_EMAIL;
  const from = process.env.RESEND_FROM ?? "onboarding@resend.dev";

  if (!resend || !to) {
    console.error("Email chưa cấu hình: thiếu RESEND_API_KEY hoặc CONTACT_INBOX_EMAIL");
    return false;
  }

  const { error } = await resend.emails.send({
    from,
    to,
    subject: input.subject,
    html: input.html,
    replyTo: input.replyTo,
  });

  if (error) {
    console.error("Lỗi gửi email:", error);
    return false;
  }
  return true;
}
