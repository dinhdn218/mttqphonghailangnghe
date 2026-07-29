import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getSettings, siteNameFor } from "@/lib/settings";

// Footer phong cách cổng thông tin nhà nước: nền đỏ tối, nhiều cột thông tin
// cơ quan + liên kết nhanh + đường dây nóng, dải dưới bản quyền & ghi nguồn.
export async function SiteFooter() {
  const t = await getTranslations();
  const locale = await getLocale();
  const year = new Date().getFullYear();
  // Tên cơ quan lấy từ Cấu hình CMS (nguồn duy nhất).
  const settings = await getSettings();
  const { contact } = settings;
  const orgName = siteNameFor(settings, locale);
  const tel = contact.hotline.replace(/\s/g, "");

  return (
    <footer className="mt-12 bg-red-900 text-red-100">
      <div className="mx-auto grid w-full max-w-container gap-8 px-4 py-8 sm:grid-cols-3">
        {/* Cơ quan */}
        <div>
          <p className="font-bold text-white uppercase">{orgName}</p>
          <p className="mt-2 text-sm">
            {t("footer.authority")}: {t("footer.office")}
          </p>
          <p className="mt-2 text-sm">
            {t("footer.addressLabel")}: {contact.address}
          </p>
          <p className="text-sm">
            {t("footer.phoneLabel")}: {contact.hotline}
          </p>
          {contact.email && (
            <p className="text-sm">
              Email:{" "}
              <a href={`mailto:${contact.email}`} className="hover:underline">
                {contact.email}
              </a>
            </p>
          )}
        </div>

        {/* Liên kết nhanh */}
        <div>
          <p className="font-semibold text-white">{t("footer.quickLinks")}</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            <li>
              <Link href="/" className="hover:underline">
                {t("nav.home")}
              </Link>
            </li>
            <li>
              <Link href="/gioi-thieu" className="hover:underline">
                {t("nav.about")}
              </Link>
            </li>
            <li>
              <Link href="/ket-noi" className="hover:underline">
                {t("nav.connect")}
              </Link>
            </li>
            <li>
              <Link href="/lang-nghe-dan-noi" className="hover:underline">
                {t("nav.contact")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Đường dây nóng */}
        <div>
          <p className="font-semibold text-white">{t("footer.hotline")}</p>
          <a
            href={`tel:${tel}`}
            className="mt-2 block text-2xl font-bold text-amber-300 hover:underline"
          >
            {contact.hotline}
          </a>
          <Link
            href="/lang-nghe-dan-noi"
            className="mt-3 inline-block bg-red-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
          >
            {t("nav.contact")} →
          </Link>
        </div>
      </div>

      {/* Dải bản quyền */}
      <div className="border-t border-red-700/60">
        {/* Không đặt link tới khu quản trị ở đây: người dân không cần, và cũng
            không nên chỉ đường vào trang đăng nhập. Cán bộ vào thẳng /dang-nhap. */}
        <div className="mx-auto w-full max-w-container px-4 py-4 text-xs text-red-200">
          <p>
            © {year} {t("footer.rights")}
          </p>
          <p>{t("footer.attribution")}</p>
        </div>
      </div>
    </footer>
  );
}
