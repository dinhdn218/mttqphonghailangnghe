// Thông tin liên hệ + các nền tảng của MTTQ xã Phong Hải.
// ⚠️ Cán bộ/dev cập nhật giá trị thật ở đây (hoặc chuyển sang biến môi trường nếu muốn).
// Mục có url rỗng "" sẽ không hiển thị.

export type Platform = {
  key: string;
  label: string;
  url: string;
  // Mô tả ngắn (tuỳ chọn)
  note?: string;
};

// Đường dây nóng + email tiếp nhận
export const CONTACT = {
  hotline: "0214 388 0xxx", // TODO: thay số thật
  email: "mttq.phonghai@laocai.gov.vn", // TODO: thay email thật
  address: "UBND xã Phong Hải, tỉnh Lào Cai",
};

// Các nền tảng để hiển thị link + mã QR. Điền url thật, để "" nếu chưa có.
export const PLATFORMS: Platform[] = [
  {
    key: "facebook",
    label: "Facebook",
    url: "", // vd: https://facebook.com/xaphonghai
  },
  {
    key: "zalo-oa-xa",
    label: "Zalo OA (xã)",
    url: "", // vd: https://zalo.me/...
    note: "Tài khoản chính thức của xã",
  },
  {
    key: "zalo-oa-tinh",
    label: "Zalo OA (tỉnh)",
    url: "", // vd: https://zalo.me/...
    note: "Tài khoản chính thức của tỉnh",
  },
  {
    key: "tiktok",
    label: "TikTok",
    url: "", // vd: https://tiktok.com/@xaphonghai
  },
];

// Chỉ các nền tảng đã có url.
export function activePlatforms(): Platform[] {
  return PLATFORMS.filter((p) => p.url.trim() !== "");
}
