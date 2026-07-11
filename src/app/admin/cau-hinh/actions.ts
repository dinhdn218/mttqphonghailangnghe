"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-guards";
import { Role } from "@/generated/prisma/client";
import { SETTING_DEFS, type SettingKey } from "@/lib/settings";

export type SettingsFormState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

const emailSchema = z.string().email();

// Cập nhật cấu hình site (chỉ ADMIN). Lưu từng key bằng upsert.
export async function updateSettings(
  _prev: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  await requireRole(Role.ADMIN);

  const fieldErrors: Record<string, string> = {};
  const updates: { key: SettingKey; value: string }[] = [];

  for (const def of SETTING_DEFS) {
    const value = String(formData.get(def.key) ?? "").trim();

    if (value === "") {
      // Trường có giá trị mặc định (tên trang, liên hệ…) không được để trống.
      if (def.default !== "") {
        fieldErrors[def.key] = "Không được để trống";
        continue;
      }
    } else {
      if (def.type === "url" && !/^https?:\/\//i.test(value)) {
        fieldErrors[def.key] = "URL phải bắt đầu bằng http:// hoặc https://";
        continue;
      }
      // Zalo OA: chặn nhầm link Zalo CÁ NHÂN (zalo.me/<số điện thoại>). Số điện
      // thoại VN có 9–11 chữ số và bắt đầu bằng 0; ID của OA dài hơn hẳn (18–19
      // chữ số) nên phân biệt được. Link cá nhân sẽ bắt người dân đăng nhập.
      if (
        def.key === "platform_zalo_xa_url" &&
        /^https?:\/\/(www\.)?zalo\.me\/0\d{8,10}\/?$/i.test(value)
      ) {
        fieldErrors[def.key] =
          "Đây là link Zalo cá nhân (số điện thoại). Zalo OA cần link lấy từ trang quản lý OA, dạng https://zalo.me/<ID OA>.";
        continue;
      }
      if (def.type === "email" && !emailSchema.safeParse(value).success) {
        fieldErrors[def.key] = "Email không hợp lệ";
        continue;
      }
    }
    updates.push({ key: def.key, value });
  }

  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

  await prisma.$transaction(
    updates.map((u) =>
      prisma.setting.upsert({
        where: { key: u.key },
        create: { key: u.key, value: u.value },
        update: { value: u.value },
      }),
    ),
  );

  // Làm mới mọi trang công khai dùng cấu hình (header/footer/liên hệ…).
  revalidatePath("/", "layout");

  return { success: true };
}
