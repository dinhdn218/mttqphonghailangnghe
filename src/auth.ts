import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/auth.config";
import {
  getClientIp,
  isLoginBlocked,
  recordFailedLogin,
  clearLoginAttempts,
} from "@/lib/rate-limit";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Lỗi riêng khi bị khoá tạm do nhập sai quá nhiều lần.
// `code` được trả cho client (signIn().code) để hiện thông báo đúng.
class RateLimitedError extends CredentialsSignin {
  code = "rate_limited";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mật khẩu", type: "password" },
      },
      async authorize(raw, request) {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const ip = getClientIp(request);

        // Chặn dò mật khẩu: kiểm tra TRƯỚC khi so mật khẩu.
        // Đặt ở đây (không phải ở form) nên gọi thẳng API cũng không lách được.
        if (await isLoginBlocked(email, ip)) {
          throw new RateLimitedError();
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.passwordHash) {
          await recordFailedLogin(email, ip);
          return null;
        }

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
          await recordFailedLogin(email, ip);
          return null;
        }

        // Đăng nhập đúng → xoá lịch sử sai.
        await clearLoginAttempts(email, ip);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
});
