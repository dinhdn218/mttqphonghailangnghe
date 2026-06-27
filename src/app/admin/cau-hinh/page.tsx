import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth-guards";
import { Role } from "@/generated/prisma/client";
import {
  getRawSettings,
  SETTING_DEFS,
  SETTING_GROUPS,
} from "@/lib/settings";
import { SettingsForm, type Field } from "./settings-form";

export default async function SettingsPage() {
  const current = await requireUser();
  if (current.role !== Role.ADMIN) redirect("/admin");

  const values = await getRawSettings();

  const fields: Field[] = SETTING_DEFS.map((d) => ({
    key: d.key,
    label: d.label,
    group: d.group,
    type: d.type,
    value: values[d.key],
    placeholder: d.placeholder,
    hint: d.hint,
  }));

  const groups = SETTING_GROUPS.map((name) => ({
    name,
    fields: fields.filter((f) => f.group === name),
  })).filter((g) => g.fields.length > 0);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Cấu hình</h1>
        <p className="mt-1 text-sm text-gray-500">
          Thông tin liên hệ và liên kết nền tảng hiển thị trên trang công khai.
        </p>
      </div>
      <SettingsForm groups={groups} />
    </div>
  );
}
