import { cache } from "react";
import { prisma } from "@/lib/prisma";

// Cấu hình site dạng key/value. Mã nguồn cấp giá trị mặc định; CMS đè lên.

export type SettingKey =
  | "site_name"
  | "site_name_en"
  | "site_description"
  | "site_description_en"
  | "contact_hotline"
  | "contact_email"
  | "contact_address"
  | "platform_facebook_url"
  | "platform_zalo_xa_url"
  | "platform_tiktok_url";

export type SettingType = "text" | "textarea" | "url" | "email" | "tel";

export type SettingDef = {
  key: SettingKey;
  label: string;
  group: string;
  type: SettingType;
  default: string;
  placeholder?: string;
  hint?: string;
};

export const SETTING_GROUPS = ["Trang", "Liên hệ", "Nền tảng"] as const;

export const SETTING_DEFS: SettingDef[] = [
  {
    key: "site_name",
    group: "Trang",
    label: "Tên cơ quan (tiếng Việt)",
    type: "text",
    default: "Ủy ban MTTQ Việt Nam xã Phong Hải",
    hint: "Hiển thị ở header, tiêu đề trình duyệt và thẻ chia sẻ. Nên ngắn gọn — phần mô tả dài để ở ô bên dưới.",
  },
  {
    key: "site_name_en",
    group: "Trang",
    label: "Tên cơ quan (tiếng Anh)",
    type: "text",
    default: "Vietnam Fatherland Front Committee of Phong Hai Commune",
  },
  {
    key: "site_description",
    group: "Trang",
    label: "Mô tả ngắn (tiếng Việt)",
    type: "textarea",
    default:
      "Trang thông tin – tuyên truyền của Ủy ban MTTQ Việt Nam xã Phong Hải, tỉnh Lào Cai: tin tức, chuyển đổi số, dịch vụ công, gương người tốt việc tốt và tiếp nhận phản ánh của nhân dân.",
    hint: "Dùng cho Google và thẻ chia sẻ mạng xã hội. Nên 120–160 ký tự.",
  },
  {
    key: "site_description_en",
    group: "Trang",
    label: "Mô tả ngắn (tiếng Anh)",
    type: "textarea",
    default:
      "Official information and communications portal of the Vietnam Fatherland Front Committee of Phong Hai Commune, Lao Cai Province.",
  },
  {
    key: "contact_hotline",
    group: "Liên hệ",
    label: "Đường dây nóng",
    type: "tel",
    default: "0214 388 0xxx",
  },
  {
    key: "contact_email",
    group: "Liên hệ",
    label: "Email tiếp nhận",
    type: "email",
    default: "mttq.phonghai@laocai.gov.vn",
  },
  {
    key: "contact_address",
    group: "Liên hệ",
    label: "Địa chỉ",
    type: "text",
    default: "UBND xã Phong Hải, tỉnh Lào Cai",
  },
  {
    key: "platform_facebook_url",
    group: "Nền tảng",
    label: "Facebook (URL)",
    type: "url",
    default: "",
    placeholder: "https://facebook.com/xaphonghai",
  },
  {
    key: "platform_zalo_xa_url",
    group: "Nền tảng",
    label: "Zalo OA xã (URL)",
    type: "url",
    default: "",
    placeholder: "https://zalo.me/...",
    hint: "Tài khoản Zalo chính thức của xã.",
  },
  {
    key: "platform_tiktok_url",
    group: "Nền tảng",
    label: "TikTok (URL)",
    type: "url",
    default: "",
    placeholder: "https://tiktok.com/@xaphonghai",
  },
];

export type SettingsMap = Record<SettingKey, string>;

const DEFAULTS = Object.fromEntries(
  SETTING_DEFS.map((d) => [d.key, d.default]),
) as SettingsMap;

const VALID_KEYS = new Set(SETTING_DEFS.map((d) => d.key));

// Toàn bộ cấu hình thô (DB đè default). Cache theo request; lỗi DB → default.
export const getRawSettings = cache(async (): Promise<SettingsMap> => {
  try {
    const rows = await prisma.setting.findMany();
    const map: SettingsMap = { ...DEFAULTS };
    for (const r of rows) {
      if (VALID_KEYS.has(r.key as SettingKey)) {
        map[r.key as SettingKey] = r.value;
      }
    }
    return map;
  } catch (e) {
    console.error("getSettings: lỗi DB, dùng mặc định:", e);
    return { ...DEFAULTS };
  }
});

export type Platform = {
  key: string;
  label: string;
  url: string;
  note?: string;
};

// Metadata tĩnh của nền tảng; chỉ URL là cấu hình được.
const PLATFORM_META: {
  key: string;
  label: string;
  note?: string;
  settingKey: SettingKey;
}[] = [
  { key: "facebook", label: "Facebook", settingKey: "platform_facebook_url" },
  {
    key: "zalo-oa-xa",
    label: "Zalo OA (xã)",
    note: "Tài khoản chính thức của xã",
    settingKey: "platform_zalo_xa_url",
  },
  { key: "tiktok", label: "TikTok", settingKey: "platform_tiktok_url" },
];

export type SiteSettings = {
  siteName: string; // tiếng Việt
  siteNameEn: string;
  siteDescription: string; // tiếng Việt
  siteDescriptionEn: string;
  contact: { hotline: string; email: string; address: string };
  platforms: Platform[];
  activePlatforms: Platform[];
};

// Chọn tên/mô tả theo ngôn ngữ đang xem; thiếu bản tiếng Anh thì lùi về tiếng Việt.
export function siteNameFor(s: SiteSettings, locale: string): string {
  return locale === "en" && s.siteNameEn.trim() ? s.siteNameEn : s.siteName;
}

export function siteDescriptionFor(s: SiteSettings, locale: string): string {
  return locale === "en" && s.siteDescriptionEn.trim()
    ? s.siteDescriptionEn
    : s.siteDescription;
}

// Cấu hình đã “gói” sẵn cho UI dùng. Cache theo request.
export const getSettings = cache(async (): Promise<SiteSettings> => {
  const s = await getRawSettings();
  const platforms: Platform[] = PLATFORM_META.map((m) => ({
    key: m.key,
    label: m.label,
    note: m.note,
    url: (s[m.settingKey] ?? "").trim(),
  }));
  return {
    siteName: s.site_name,
    siteNameEn: s.site_name_en,
    siteDescription: s.site_description,
    siteDescriptionEn: s.site_description_en,
    contact: {
      hotline: s.contact_hotline,
      email: s.contact_email,
      address: s.contact_address,
    },
    platforms,
    activePlatforms: platforms.filter((p) => p.url !== ""),
  };
});
