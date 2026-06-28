"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth-guards";

export type ProfileState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

// Cập nhật hồ sơ của chính mình: đổi tên + (tuỳ chọn) đổi mật khẩu.
export async function updateProfile(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const sessionUser = await requireUser();

  const name = String(formData.get("name") ?? "").trim();
  if (name.length < 1) {
    return { fieldErrors: { name: "Vui lòng nhập họ tên" } };
  }

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  const wantsPasswordChange =
    currentPassword !== "" || newPassword !== "" || confirmPassword !== "";

  const data: { name: string; passwordHash?: string } = { name };

  if (wantsPasswordChange) {
    const dbUser = await prisma.user.findUnique({
      where: { id: sessionUser.id },
    });
    if (!dbUser?.passwordHash) {
      return { error: "Tài khoản này không dùng mật khẩu để đăng nhập." };
    }
    const valid = await bcrypt.compare(currentPassword, dbUser.passwordHash);
    if (!valid) {
      return { fieldErrors: { currentPassword: "Mật khẩu hiện tại không đúng" } };
    }
    if (newPassword.length < 8) {
      return { fieldErrors: { newPassword: "Mật khẩu mới tối thiểu 8 ký tự" } };
    }
    if (newPassword !== confirmPassword) {
      return {
        fieldErrors: { confirmPassword: "Xác nhận mật khẩu không khớp" },
      };
    }
    data.passwordHash = await bcrypt.hash(newPassword, 10);
  }

  await prisma.user.update({ where: { id: sessionUser.id }, data });

  revalidatePath("/admin/tai-khoan");
  return { success: true };
}
