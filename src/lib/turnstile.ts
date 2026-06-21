// Xác minh token Cloudflare Turnstile ở server.
// Nếu TURNSTILE_SECRET_KEY trống → coi như chưa bật captcha, trả về true
// (form vẫn chạy nhờ honeypot). Khi có key thì bắt buộc token hợp lệ.

export function isTurnstileEnabled(): boolean {
  return !!process.env.TURNSTILE_SECRET_KEY;
}

export async function verifyTurnstile(
  token: string | undefined,
  ip?: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // chưa bật captcha
  if (!token) return false;

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
        ...(ip ? { remoteip: ip } : {}),
      }),
    },
  );

  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}
