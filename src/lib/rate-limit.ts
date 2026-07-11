import { prisma } from "@/lib/prisma";

// Chống dò mật khẩu (brute force) cho trang đăng nhập.
// Đếm số lần SAI trong cửa sổ thời gian, theo cả email lẫn IP.
// Lưu ở DB (không lưu bộ nhớ) để vẫn đúng khi chạy nhiều instance trên Vercel.

export const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 phút
export const LOGIN_MAX_ATTEMPTS = 5;
export const LOGIN_WINDOW_MINUTES = LOGIN_WINDOW_MS / 60_000;

function recentWhere(email: string, ip?: string) {
  return {
    createdAt: { gte: new Date(Date.now() - LOGIN_WINDOW_MS) },
    OR: ip ? [{ email }, { ip }] : [{ email }],
  };
}

// Lấy IP thật của client (sau proxy/Vercel).
export function getClientIp(request?: Request): string | undefined {
  const h = request?.headers;
  if (!h) return undefined;
  const xff = h.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || undefined;
  return h.get("x-real-ip") ?? undefined;
}

// Đã vượt ngưỡng cho phép chưa?
export async function isLoginBlocked(
  email: string,
  ip?: string,
): Promise<boolean> {
  try {
    const count = await prisma.loginAttempt.count({
      where: recentWhere(email, ip),
    });
    return count >= LOGIN_MAX_ATTEMPTS;
  } catch (e) {
    // Lỗi DB thì KHÔNG khoá người dùng thật (fail-open cho tiện dụng);
    // mật khẩu vẫn phải đúng mới vào được.
    console.error("rate-limit: lỗi đếm lần đăng nhập:", e);
    return false;
  }
}

// Ghi nhận một lần đăng nhập sai.
export async function recordFailedLogin(email: string, ip?: string) {
  try {
    await prisma.loginAttempt.create({ data: { email, ip: ip ?? null } });
    // Dọn bản ghi đã hết hạn để bảng không phình (không chặn luồng nếu lỗi).
    await prisma.loginAttempt.deleteMany({
      where: { createdAt: { lt: new Date(Date.now() - LOGIN_WINDOW_MS) } },
    });
  } catch (e) {
    console.error("rate-limit: lỗi ghi lần đăng nhập sai:", e);
  }
}

// Đăng nhập đúng → xoá lịch sử sai của email/IP đó.
export async function clearLoginAttempts(email: string, ip?: string) {
  try {
    await prisma.loginAttempt.deleteMany({
      where: { OR: ip ? [{ email }, { ip }] : [{ email }] },
    });
  } catch (e) {
    console.error("rate-limit: lỗi xoá lần đăng nhập sai:", e);
  }
}
