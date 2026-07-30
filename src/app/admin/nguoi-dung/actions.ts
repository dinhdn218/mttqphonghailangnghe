"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-guards";
import { Role } from "@/generated/prisma/client";

export type UserFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

const baseSchema = z.object({
  name: z.string().trim().min(1, "Vui lòng nhập họ tên"),
  email: z.string().trim().toLowerCase().email("Email không hợp lệ"),
  role: z.nativeEnum(Role),
});

function toFieldErrors(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

// Tạo tài khoản mới (chỉ ADMIN). Mật khẩu bắt buộc, tối thiểu 8 ký tự.
export async function createUser(
  _prev: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  await requireRole(Role.ADMIN);

  const parsed = baseSchema
    .extend({ password: z.string().min(8, "Mật khẩu tối thiểu 8 ký tự") })
    .safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      role: formData.get("role"),
      password: formData.get("password"),
    });
  if (!parsed.success) return { fieldErrors: toFieldErrors(parsed.error) };

  const { name, email, role, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { fieldErrors: { email: "Email đã được dùng" } };

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { name, email, role, passwordHash } });

  revalidatePath("/admin/nguoi-dung");
  redirect("/admin/nguoi-dung?saved=created");
}

// Cập nhật tài khoản (chỉ ADMIN). Để trống mật khẩu = giữ nguyên.
export async function updateUser(
  _prev: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  await requireRole(Role.ADMIN);

  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Thiếu mã người dùng" };

  const parsed = baseSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    role: formData.get("role"),
  });
  if (!parsed.success) return { fieldErrors: toFieldErrors(parsed.error) };
  const { name, email, role } = parsed.data;

  const target = await prisma.user.findUnique({ where: { id } });
  if (!target) return { error: "Không tìm thấy người dùng" };

  // Email trùng người khác?
  const dup = await prisma.user.findFirst({ where: { email, NOT: { id } } });
  if (dup) return { fieldErrors: { email: "Email đã được dùng" } };

  // Không để mất người Quản trị cuối cùng.
  if (target.role === Role.ADMIN && role !== Role.ADMIN) {
    const admins = await prisma.user.count({ where: { role: Role.ADMIN } });
    if (admins <= 1)
      return { error: "Phải còn ít nhất một tài khoản Quản trị." };
  }

  // Mật khẩu tuỳ chọn.
  const passwordRaw = String(formData.get("password") ?? "");
  let passwordHash: string | undefined;
  if (passwordRaw.length > 0) {
    if (passwordRaw.length < 8)
      return { fieldErrors: { password: "Mật khẩu tối thiểu 8 ký tự" } };
    passwordHash = await bcrypt.hash(passwordRaw, 10);
  }

  await prisma.user.update({
    where: { id },
    data: { name, email, role, ...(passwordHash ? { passwordHash } : {}) },
  });

  revalidatePath("/admin/nguoi-dung");
  redirect("/admin/nguoi-dung?saved=updated");
}

// Xoá tài khoản (chỉ ADMIN). Chặn tự xoá, xoá Quản trị cuối, hoặc xoá khi còn bài.
export async function deleteUser(formData: FormData) {
  const current = await requireRole(Role.ADMIN);

  const id = String(formData.get("id") ?? "");
  if (!id) redirect("/admin/nguoi-dung");
  if (id === current.id) redirect("/admin/nguoi-dung?error=self");

  const target = await prisma.user.findUnique({
    where: { id },
    include: { _count: { select: { authoredPosts: true } } },
  });
  if (!target) redirect("/admin/nguoi-dung");

  if (target._count.authoredPosts > 0)
    redirect("/admin/nguoi-dung?error=hasposts");

  if (target.role === Role.ADMIN) {
    const admins = await prisma.user.count({ where: { role: Role.ADMIN } });
    if (admins <= 1) redirect("/admin/nguoi-dung?error=lastadmin");
  }

  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/nguoi-dung");
  redirect("/admin/nguoi-dung?deleted=1");
}
