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
      // Ghi chú: KHÔNG chặn link Zalo cá nhân (zalo.me/<số điện thoại>). Xã có thể
      // chưa có Official Account, khi đó dùng tạm số Zalo của văn phòng xã vẫn hợp
      // lệ — chỉ là trên máy tính người dùng phải đăng nhập trước. Phần gợi ý ở ô
      // nhập đã nói rõ ưu/nhược để cán bộ tự chọn.
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
