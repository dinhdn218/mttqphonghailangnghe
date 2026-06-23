import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// Layout cho các trang công khai (trang chủ, chuyên mục, bài viết).
// Khu vực /admin và /dang-nhap KHÔNG dùng layout này.
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
