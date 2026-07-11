import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingActions } from "@/components/floating-actions";
import { getSettings } from "@/lib/settings";

// Layout cho các trang công khai (trang chủ, chuyên mục, bài viết).
// Khu vực /admin và /dang-nhap KHÔNG dùng layout này.
export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Nút nổi liên hệ chỉ hiện nền tảng đã cấu hình trong CMS.
  const { contact, activePlatforms } = await getSettings();

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
      <FloatingActions
        hotline={contact.hotline}
        platforms={activePlatforms.map((p) => ({
          key: p.key,
          label: p.label,
          url: p.url,
        }))}
      />
    </div>
  );
}
