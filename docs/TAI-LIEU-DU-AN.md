# TÀI LIỆU DỰ ÁN

## Website tuyên truyền — Ủy ban MTTQ Việt Nam xã Phong Hải (tỉnh Lào Cai)

| | |
|---|---|
| **Tên dự án** | Trang thông tin – tuyên truyền MTTQ xã Phong Hải |
| **Tên miền đích** | phonghailangnghe.com |
| **Loại hệ thống** | Cổng thông tin điện tử + Hệ quản trị nội dung (CMS) |
| **Đối tượng người dùng** | Người dân (chủ yếu truy cập bằng điện thoại) + cán bộ quản trị |
| **Phiên bản tài liệu** | 1.1 |

---

# 1. Giới thiệu

Website là **trang thông tin – tuyên truyền** cho Ủy ban MTTQ Việt Nam và các tổ chức chính trị – xã hội của xã Phong Hải. Hệ thống gồm hai phần:

- **Trang công khai** (người dân xem): tin tức, mô hình hay, gương người tốt, hướng dẫn dịch vụ công, thư viện ảnh/video, form tiếp nhận phản ánh, liên kết các nền tảng (Facebook, Zalo, TikTok), mã QR.
- **Hệ quản trị (CMS)**: nơi cán bộ soạn bài, kiểm duyệt, đăng tin, quản lý media, tiếp nhận phản ánh của dân và cấu hình hệ thống.

Hệ thống được tối ưu cho **thiết bị di động** vì người dùng cuối chủ yếu là người dân vùng dân tộc thiểu số truy cập bằng điện thoại. Giao diện song ngữ **Tiếng Việt – Tiếng Anh**.

---

# 2. Mục tiêu & phạm vi

## 2.1. Mục tiêu
- Cung cấp kênh thông tin chính thống, dễ truy cập cho người dân.
- Trao cho cán bộ công cụ tự soạn và đăng nội dung mà không cần kỹ năng lập trình.
- Bảo đảm quy trình kiểm duyệt nội dung trước khi công khai.
- Đáp ứng an toàn thông tin mức cơ bản theo Nghị định 85/2016/NĐ-CP (hệ thống cấp độ 1).

## 2.2. Phạm vi chức năng công khai
Phần lớn nội dung dùng chung **một khuôn "bài viết"** (trang danh sách + trang chi tiết), phân loại theo chuyên mục. **8 chuyên mục bài viết**:

1. Tin tức – Sự kiện
2. Chuyển đổi số cộng đồng
3. Hướng dẫn dịch vụ công trực tuyến
4. Mô hình hay – Phong trào thi đua
5. Các cuộc vận động
6. Gương người tốt việc tốt
7. Cải tạo tập tục – đời sống văn hóa mới
8. Thư viện (văn bản / ảnh / video / infographic)

Ngoài ra:
- **Lắng nghe dân nói** — form tiếp nhận phản ánh của người dân (lưu vào hệ thống, cán bộ xử lý trong CMS).
- **Kết nối** — liên kết Facebook, Zalo, TikTok, đường dây nóng; hiển thị mã QR từng nền tảng.
- **Giới thiệu** — trang giới thiệu cố định về MTTQ xã.

---

# 3. Công nghệ sử dụng

| Thành phần | Công nghệ | Phiên bản |
|---|---|---|
| Framework | Next.js (App Router, full-stack) | 16.2 |
| Ngôn ngữ | TypeScript / React | React 19.2 |
| Cơ sở dữ liệu | PostgreSQL (Neon) | — |
| ORM | Prisma (driver adapter `@prisma/adapter-pg`) | 7.8 |
| Xác thực & phân quyền | Auth.js (NextAuth) | v5 |
| Soạn thảo bài viết | Tiptap (rich text) | 3.27 |
| Lưu trữ ảnh/video | Cloudinary | — |
| Đa ngôn ngữ | next-intl (Việt – Anh) | 4.13 |
| Kiểm tra dữ liệu | Zod | 4.4 |
| Chống spam form | Honeypot + Cloudflare Turnstile (tuỳ chọn) | — |
| Giao diện | Tailwind CSS v4 | — |
| Triển khai | Vercel (hoặc VPS) | — |

**Lý do chọn stack:** giảm tối đa gánh nặng backend bằng cách dùng thư viện sẵn có cho phần rủi ro (xác thực, ORM), ưu tiên sự ổn định và dễ bảo trì.

---

# 4. Kiến trúc hệ thống

## 4.1. Tổng quan
Next.js App Router đảm nhiệm cả frontend và backend (server components + server actions) trong cùng một mã nguồn. Không cần API server riêng.

```
Người dùng (trình duyệt điện thoại / máy tính)
        │
        ▼
Next.js (Vercel / VPS)
   ├── Trang công khai (Server Components)
   ├── Hệ quản trị /admin (Server Components + Server Actions)
   ├── Xác thực Auth.js (middleware/proxy chặn /admin)
   └── Prisma ORM
        │
        ▼
PostgreSQL (Neon)        Cloudinary (ảnh/video)
```

## 4.2. Cấu trúc thư mục chính

```
src/
├── app/
│   ├── [locale]/(public)/      # Trang công khai (song ngữ)
│   │   ├── page.tsx            # Trang chủ
│   │   ├── bai-viet/[slug]/    # Chi tiết bài viết
│   │   ├── chuyen-muc/[slug]/  # Danh sách theo chuyên mục
│   │   ├── gioi-thieu/         # Giới thiệu
│   │   ├── ket-noi/            # Kết nối / nền tảng / QR
│   │   └── lang-nghe-dan-noi/  # Form phản ánh
│   ├── admin/                  # Hệ quản trị (CMS)
│   │   ├── page.tsx            # Tổng quan (dashboard)
│   │   ├── bai-viet/           # Quản lý bài viết
│   │   ├── noi-bat/            # Quản lý bài nổi bật
│   │   ├── thu-vien/           # Thư viện media
│   │   ├── phan-anh/           # Phản ánh người dân
│   │   ├── nguoi-dung/         # Quản lý người dùng
│   │   ├── cau-hinh/           # Cấu hình site
│   │   └── tai-khoan/          # Hồ sơ cá nhân
│   └── dang-nhap/              # Đăng nhập
├── components/                 # Component dùng chung
├── lib/                        # Tiện ích (prisma, auth, settings, posts…)
└── generated/prisma/           # Prisma Client sinh tự động
prisma/schema.prisma            # Định nghĩa cơ sở dữ liệu
messages/{vi,en}.json           # Chuỗi đa ngôn ngữ
```

## 4.3. Đa ngôn ngữ
- Tiếng Việt là mặc định, **không có tiền tố** URL (`/gioi-thieu`).
- Tiếng Anh dùng tiền tố `/en` (`/en/gioi-thieu`).
- Nội dung bài viết song ngữ lưu **cột kép** (`titleVi`/`titleEn`, `contentVi`/`contentEn`…); thiếu bản dịch thì hiển thị bản tiếng Việt.

---

# 5. Cơ sở dữ liệu

Hệ thống dùng PostgreSQL với 10 bảng (model Prisma). Các bảng `Account`, `Session`, `VerificationToken` phục vụ Auth.js.

## 5.1. Các bảng nghiệp vụ

**User — Người dùng (cán bộ):**
| Trường | Kiểu | Ghi chú |
|---|---|---|
| id | String | Khoá chính |
| name | String? | Họ tên |
| email | String | Đăng nhập, duy nhất |
| passwordHash | String? | Mật khẩu băm bcrypt |
| role | Role | ADMIN / EDITOR / APPROVER |

**Post — Bài viết:**
| Trường | Kiểu | Ghi chú |
|---|---|---|
| id, slug | String | slug duy nhất cho URL |
| titleVi/En, excerptVi/En, contentVi/En | String | Nội dung song ngữ |
| coverImage | String? | Ảnh bìa (Cloudinary) |
| status | PostStatus | DRAFT/PENDING/PUBLISHED/REJECTED |
| featured | Boolean | Bài nổi bật trang chủ |
| categoryId | String | Thuộc chuyên mục |
| authorId / reviewedById | String | Tác giả / người duyệt |
| publishedAt | DateTime? | Thời điểm đăng |

**Category — Chuyên mục:** id, slug (duy nhất), nameVi, nameEn.

**Media — Tệp đa phương tiện:** id, url, publicId (Cloudinary), type (IMAGE/VIDEO/INFOGRAPHIC), alt, gắn với bài (postId) và người tải (uploadedById).

**Feedback — Phản ánh người dân:** id, name, phone?, email?, message, status (NEW/RESOLVED), createdAt.

**Setting — Cấu hình:** key (khoá), value — lưu dạng key/value: **tên cơ quan (Việt + Anh)**, **mô tả ngắn (Việt + Anh)**, thông tin liên hệ, link các nền tảng. Đây là **nguồn duy nhất** cho tên cơ quan hiển thị khắp site (header, chân trang, tiêu đề trình duyệt, thẻ chia sẻ, dữ liệu có cấu trúc).

**LoginAttempt — Lần đăng nhập sai:** id, email, ip?, createdAt — phục vụ chống dò mật khẩu (xem mục 10). Bản ghi hết hạn được dọn tự động.

## 5.2. Các kiểu liệt kê (enum)
- **Role:** `ADMIN` (Quản trị), `EDITOR` (Biên tập), `APPROVER` (Duyệt).
- **PostStatus:** `DRAFT` (nháp) → `PENDING` (chờ duyệt) → `PUBLISHED` (đã đăng) | `REJECTED` (trả lại).
- **MediaType:** `IMAGE`, `VIDEO`, `INFOGRAPHIC`.
- **FeedbackStatus:** `NEW` (mới), `RESOLVED` (đã xử lý).

---

# 6. Phân quyền & luồng kiểm duyệt

## 6.1. Ba vai trò
| Vai trò | Quyền hạn |
|---|---|
| **Quản trị (ADMIN)** | Toàn quyền: quản lý người dùng, cấu hình hệ thống, mọi thao tác với bài viết, phản ánh, media. |
| **Biên tập (EDITOR)** | Soạn/sửa bài **của mình**, gửi duyệt. Chỉ thấy bài do mình tạo. |
| **Duyệt (APPROVER)** | Duyệt hoặc trả lại bài trước khi đăng; quản lý bài nổi bật. |

## 6.2. Luồng kiểm duyệt bài viết
```
[EDITOR soạn]  →  DRAFT (Nháp)
        │ gửi duyệt
        ▼
     PENDING (Chờ duyệt)
        │
   ┌────┴─────┐
[APPROVER]   [APPROVER]
 duyệt         trả lại
   ▼            ▼
PUBLISHED    REJECTED  → (EDITOR sửa, gửi lại)
(Đã đăng)
```
Bài **chỉ hiển thị công khai khi ở trạng thái PUBLISHED**. Cơ chế này bảo đảm nội dung được kiểm duyệt trước khi đăng.

## 6.3. Xác thực
- Đăng nhập bằng email + mật khẩu (Auth.js, credentials). Mật khẩu băm **bcrypt**.
- Khu vực `/admin` được bảo vệ: chưa đăng nhập sẽ bị chuyển về trang đăng nhập.
- Một số trang chỉ dành cho ADMIN (Người dùng, Cấu hình) hoặc ADMIN+APPROVER (Bài nổi bật) — truy cập sai vai sẽ bị chuyển hướng.
- **Chống dò mật khẩu:** sai 5 lần trong 15 phút (tính theo cả email lẫn địa chỉ IP) sẽ bị khoá tạm; đăng nhập đúng thì xoá lịch sử sai.
- **Phiên đăng nhập hết hạn sau 8 giờ** (một ca làm việc), tránh rủi ro khi cán bộ quên đăng xuất trên máy dùng chung.

---

# 7. Tính năng trang công khai

| Trang | Mô tả |
|---|---|
| **Trang chủ** | Khối bài nổi bật (1 tin lớn + 2 thẻ + hộp "tin tiêu điểm") + các khối chuyên mục, mỗi khối 2 tin có ảnh + danh sách tin. |
| **Chuyên mục** | Danh sách bài theo chuyên mục, có phân trang. |
| **Chi tiết bài viết** | Nội dung đầy đủ (ảnh, video, định dạng), hiển thị theo ngôn ngữ đang chọn. |
| **Giới thiệu** | Trang tĩnh giới thiệu MTTQ xã. |
| **Kết nối** | Thông tin liên hệ (đường dây nóng, email, địa chỉ + bản đồ Google), liên kết & mã QR các nền tảng (Facebook, Zalo, TikTok). |
| **Lắng nghe dân nói** | Form gửi phản ánh: họ tên, điện thoại, email, nội dung. Có chống spam (honeypot + Turnstile). |

**Bài nổi bật trang chủ:** ưu tiên các bài được cán bộ đánh dấu ⭐; nếu chưa đủ 13 bài thì tự lấp bằng bài mới nhất. Khối đầu trang gồm: 1 tin hero ảnh lớn + 2 thẻ + tối đa 10 tin trong hộp "Tin tiêu điểm".

**Nút nổi ở góc phải dưới màn hình** (mọi trang công khai):
- **Gọi** đường dây nóng (bấm là gọi ngay), **Facebook**, **Zalo**, **TikTok** — chỉ hiện những nền tảng đã được cấu hình trong CMS; chưa có link thì tự ẩn.
- **Lên đầu trang** — hiện khi người dùng đã cuộn xuống.
- Trên điện thoại, các biểu tượng mạng xã hội và nút gọi **thu gọn sau một nút ➕** để tiết kiệm màn hình.

**Mã QR** trên trang Kết nối được **sinh tự động** từ đường dẫn đã cấu hình — đổi link trong CMS là mã QR đổi theo, không cần thiết kế lại ảnh.

---

# 8. Hệ quản trị (CMS)

Giao diện CMS theo bố cục **sidebar trái + header và nội dung bên phải**, tông đỏ–vàng, tối ưu cả desktop lẫn di động (sidebar thu gọn thành menu trượt). Sidebar và header **dính theo màn hình** nên khi soạn bài dài vẫn bấm được menu; có thêm nút **lên đầu trang**.

| Mục | Đường dẫn | Chức năng |
|---|---|---|
| **Tổng quan** | `/admin` | Bảng điều hành: thống kê bài viết theo trạng thái, số phản ánh mới, danh sách phản ánh & bài chờ duyệt gần đây. |
| **Bài viết** | `/admin/bai-viet` | Danh sách + **lọc** theo trạng thái/chuyên mục + **tìm kiếm** + **phân trang**. Tạo/sửa bài bằng trình soạn thảo Tiptap, upload ảnh Cloudinary, gửi duyệt/duyệt/đăng. |
| **Bài nổi bật** | `/admin/noi-bat` | Bật/tắt ⭐ để đưa bài lên khối đầu trang chủ (ADMIN + APPROVER). |
| **Thư viện** | `/admin/thu-vien` | Lưới ảnh/video đã tải lên: tải mới, sao chép URL, xoá (xoá cả trên Cloudinary). |
| **Phản ánh** | `/admin/phan-anh` | Danh sách phản ánh người dân, lọc theo trạng thái, xem chi tiết, đánh dấu đã xử lý, xoá. Badge số phản ánh mới trên menu. |
| **Người dùng** | `/admin/nguoi-dung` | (ADMIN) Tạo/sửa/xoá tài khoản, phân vai, đặt lại mật khẩu. |
| **Cấu hình** | `/admin/cau-hinh` | (ADMIN) Sửa **tên cơ quan + mô tả ngắn (Việt & Anh)**, thông tin liên hệ, link các nền tảng; áp dụng ngay ra trang công khai. |
| **Tài khoản** | `/admin/tai-khoan` | Đổi họ tên + mật khẩu của chính mình. |

Tất cả trang danh sách dùng chung **ô tìm kiếm** và **bộ phân trang đánh số** thống nhất.

---

# 9. Hướng dẫn sử dụng cho cán bộ

## 9.1. Đăng nhập
1. Truy cập `…/dang-nhap`.
2. Nhập email + mật khẩu được cấp.
3. Lần đầu nên vào **Tài khoản → đổi mật khẩu**.

## 9.2. Viết và đăng bài (Biên tập → Duyệt)
1. **Bài viết → + Viết bài mới**.
2. Nhập tiêu đề, tóm tắt, nội dung (tiếng Việt; thêm tiếng Anh nếu có). Dùng thanh công cụ để định dạng, chèn ảnh.
3. Chọn **chuyên mục**, tải **ảnh bìa**.
4. **Lưu nháp** hoặc **Gửi duyệt**.
5. Người có vai **Duyệt** vào **Bài viết → lọc Chờ duyệt**, mở bài và **Duyệt** (đăng) hoặc **Trả lại** (kèm lý do).
6. Bài được duyệt sẽ tự công khai.

## 9.3. Đưa bài lên trang chủ
- Vào **Bài nổi bật**, bấm ngôi sao ☆ → ★ ở bài muốn nổi bật. Trang chủ hiển thị tối đa 13 bài nổi bật (mới nhất trước).

## 9.4. Xử lý phản ánh của dân
1. Khi có phản ánh mới, menu **Phản ánh** hiện số đếm.
2. Mở phản ánh, xem nội dung + liên hệ (bấm gọi/email trực tiếp).
3. Xử lý xong bấm **Đánh dấu đã xử lý**. Có thể **Xoá** phản ánh.

## 9.5. Quản lý media
- Vào **Thư viện** để tải ảnh/video, sao chép URL dùng lại, hoặc xoá tệp không dùng.

## 9.6. Cấu hình thông tin chung
Vào **Cấu hình** để sửa (lưu là áp dụng ngay ra trang công khai):
- **Tên cơ quan** và **mô tả ngắn** (mỗi thứ có bản tiếng Việt + tiếng Anh). Tên này hiển thị ở **header, chân trang, tiêu đề trình duyệt và thẻ chia sẻ mạng xã hội** — sửa một chỗ, cả site đổi theo.
- **Đường dây nóng / email / địa chỉ** (dùng cho chân trang, trang Kết nối, nút gọi, bản đồ).
- **Link các nền tảng** (Facebook, Zalo, TikTok). Nền tảng **để trống thì tự ẩn** khỏi trang Kết nối và nút nổi — không để lại liên kết chết.

> **Lưu ý về Zalo:** nên dùng link **Official Account (OA)** của xã (người dân xem được ngay và bấm "Quan tâm" để nhận tin). Nếu xã chưa có OA, có thể dùng tạm link Zalo của văn phòng xã (`zalo.me/<số điện thoại>`) — vẫn liên hệ được, nhưng trên máy tính người dùng phải đăng nhập Zalo trước.

## 9.7. Quản lý người dùng (chỉ Quản trị)
- **Người dùng → + Thêm người dùng**: nhập tên, email, mật khẩu, chọn vai trò. Có thể sửa vai/đặt lại mật khẩu, hoặc xoá (không xoá được chính mình, người Quản trị cuối cùng, hoặc người còn bài viết).

---

# 10. An toàn thông tin

Hệ thống đáp ứng mức cơ bản tương ứng hệ thống cấp độ 1 (Nghị định 85/2016/NĐ-CP):

- **HTTPS/SSL** toàn site (Vercel tự cấp và tự gia hạn chứng chỉ).
- **Phân quyền 3 vai** + chặn truy cập khu vực quản trị ngay tại tầng định tuyến.
- **Mật khẩu băm bcrypt**, không lưu mật khẩu thô.
- **Chống dò mật khẩu (brute force)**: sai 5 lần / 15 phút (theo email *và* IP) là khoá tạm. Chốt chặn đặt trong hàm xác thực nên gọi thẳng API cũng không lách được.
- **Phiên đăng nhập hết hạn sau 8 giờ.**
- **Chống SQL Injection**: dùng Prisma ORM (truy vấn tham số hoá, không ghép chuỗi SQL).
- **Chống XSS**: React tự thoát chuỗi; nội dung soạn thảo qua Tiptap.
- **Chống spam form**: honeypot + Cloudflare Turnstile (captcha vô hình, tuỳ chọn bật).
- **Header bảo mật**: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy; ẩn header lộ công nghệ.
- **Khu quản trị không bị lập chỉ mục**: chặn trong `robots.txt` và bằng thẻ meta `noindex`; chân trang **không đặt link** vào trang đăng nhập.
- **Sao lưu định kỳ**: cơ sở dữ liệu Neon có sao lưu; cần đưa bảng `Feedback` (phản ánh của dân) vào quy trình sao lưu.

> Việc lập hồ sơ đề xuất cấp độ an toàn / thẩm định thuộc trách nhiệm bên chủ quản (cơ quan), không thuộc phạm vi phát triển.

---

# 11. Tối ưu tìm kiếm & chia sẻ (SEO)

- **Ảnh chia sẻ (Open Graph)**: ảnh thương hiệu 2400×1260 (nền đỏ, sao vàng, tên cơ quan) tự gắn cho mọi trang. Riêng trang bài viết dùng **ảnh bìa của bài**.
- **Thẻ metadata đầy đủ**: `og:*`, thẻ Twitter/X (`summary_large_image`), tiêu đề, mô tả, từ khoá — tất cả lấy **tên & mô tả từ Cấu hình CMS**.
- **Đa ngôn ngữ cho máy tìm kiếm**: khai báo `canonical` và `hreflang` (vi/en) trên mọi trang.
- **Dữ liệu có cấu trúc (JSON-LD)**: khai báo `GovernmentOrganization` (tên, logo, đường dây nóng, địa chỉ, các kênh chính thức) và `NewsArticle` cho từng bài viết → Google hiểu đúng đây là cơ quan nhà nước.
- **`sitemap.xml`** (sinh tự động từ bài viết + chuyên mục, cả 2 ngôn ngữ) và **`robots.txt`**.

> **Sau khi đổi ảnh/nội dung chia sẻ**, Facebook vẫn nhớ bản cũ (cache). Cần vào **Facebook Sharing Debugger** (`developers.facebook.com/tools/debug`), dán địa chỉ trang và bấm **"Thu thập lại"**.

---

# 12. Cài đặt & chạy dự án

## 12.1. Yêu cầu
- Node.js 20+ và npm.
- Tài khoản PostgreSQL (Neon), Cloudinary; (tuỳ chọn) Cloudflare Turnstile.

## 12.2. Biến môi trường (`.env`)
```
DATABASE_URL="postgresql://…"          # Kết nối PostgreSQL
AUTH_SECRET="…"                        # Khoá ký phiên đăng nhập
CLOUDINARY_CLOUD_NAME / API_KEY / API_SECRET
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME / API_KEY
TURNSTILE_SECRET_KEY / NEXT_PUBLIC_TURNSTILE_SITE_KEY   # tuỳ chọn captcha
NEXT_PUBLIC_SITE_URL="https://phonghailangnghe.com"
```

## 12.3. Các lệnh thường dùng
```bash
npm install            # Cài thư viện
npm run db:push        # Đồng bộ schema lên cơ sở dữ liệu
npm run db:seed        # Tạo dữ liệu mẫu (tài khoản, chuyên mục, bài demo)
npm run dev            # Chạy môi trường phát triển (http://localhost:3000)
npm run build          # Đóng gói sản phẩm
npm run start          # Chạy bản đóng gói
npm run typecheck      # Kiểm tra kiểu TypeScript
```

> **Lưu ý:** sau khi thay đổi `schema.prisma`, phải chạy lại `npm run db:push` và **khởi động lại** server phát triển để nạp Prisma Client mới.

---

# 13. Triển khai

## 13.1. Vercel (khuyến nghị)
1. Kết nối kho mã với Vercel.
2. Khai báo biến môi trường như mục 12.2 (nhớ `NEXT_PUBLIC_SITE_URL` là tên miền thật).
3. Vercel tự build (`prisma generate && next build`) và phát hành.
4. Gắn tên miền `phonghailangnghe.com` vào dự án (Settings → Domains). Vì tên miền đã mua sẵn trên Vercel nên DNS và SSL được cấu hình tự động.

## 13.2. Tên miền
Tên miền **`phonghailangnghe.com` đã được mua và quản lý trên Vercel** — cùng nền tảng triển khai. Nhờ vậy:
- Vercel tự cấu hình DNS và **tự cấp chứng chỉ SSL** (HTTPS), tự gia hạn.
- Không cần thao tác trỏ bản ghi DNS thủ công: chỉ cần thêm tên miền vào dự án trên Vercel (**Project → Settings → Domains**), chọn cả `phonghailangnghe.com` và `www.phonghailangnghe.com` (chuyển hướng www → tên miền chính).
- Nhớ đặt biến `NEXT_PUBLIC_SITE_URL="https://phonghailangnghe.com"` để sitemap, robots và thẻ chia sẻ (OG) sinh đúng đường dẫn.

**Khi bàn giao:** thống nhất với cơ quan việc chuyển quyền sở hữu tên miền, hoặc dev tiếp tục đứng tên và tính vào phí duy trì hằng năm. Tên miền cần được **gia hạn đúng hạn** để website không gián đoạn.

## 13.3. VPS (nếu yêu cầu đặt dữ liệu tại Việt Nam)
Chạy `npm run build` + `npm run start` sau proxy (Nginx) có SSL; dùng PostgreSQL nội bộ thay Neon.

---

# 14. Vận hành & bảo trì

- **Bảo hành 12 tháng** kể từ nghiệm thu: sửa miễn phí mọi lỗi phát sinh từ mã nguồn do dev phát triển.
- **Sao lưu** cơ sở dữ liệu định kỳ (đặc biệt bảng bài viết và phản ánh).
- **Cập nhật bản vá** thư viện khi có khuyến cáo bảo mật.
- **Nội dung thật** do cơ quan tự soạn và nhập qua CMS sau bàn giao; dev cung cấp nội dung tĩnh + vài bài demo minh hoạ.

---

# 15. Phụ lục

## 15.1. Tài khoản mẫu (dữ liệu seed — đổi mật khẩu ngay sau bàn giao)
| Vai trò | Email | Mật khẩu mặc định |
|---|---|---|
| Quản trị | admin@phonghailangnghe.com | Admin@12345 |
| Biên tập | bientap@phonghailangnghe.com | Test@12345 |
| Duyệt | duyet@phonghailangnghe.com | Test@12345 |

## 15.2. Sơ đồ trạng thái bài viết
`DRAFT` (Nháp) → `PENDING` (Chờ duyệt) → `PUBLISHED` (Đã đăng) hoặc `REJECTED` (Trả lại).

## 15.3. Danh mục kiểm tra trước khi mở công khai

**Bảo mật**
- [ ] Đổi mật khẩu cả 3 tài khoản mẫu ở mục 15.1 (vào **Tài khoản của tôi**).
- [ ] Xoá các tài khoản không dùng đến.
- [ ] Bật captcha Turnstile (`TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`) để form phản ánh không bị spam.

**Nội dung & cấu hình**
- [ ] Thay **đường dây nóng** và **email** thật của xã (đang là giá trị mẫu).
- [ ] Thay **link Facebook / Zalo / TikTok** bằng kênh **chính thức của xã** (không dùng tài khoản cá nhân). Chưa có kênh nào thì **để trống** — nút và mã QR sẽ tự ẩn.
- [ ] Xoá các **bài viết mẫu** và thay bằng nội dung thật.
- [ ] Kiểm tra **ảnh bìa** các bài đã dùng ảnh thật (không còn ảnh minh hoạ tạm).

**Triển khai**
- [ ] Khai đủ biến môi trường trên Vercel; `NEXT_PUBLIC_SITE_URL` là tên miền thật.
- [ ] Gắn tên miền vào dự án; kiểm tra HTTPS hoạt động.
- [ ] Vào **Facebook Sharing Debugger** bấm **"Thu thập lại"** để cập nhật ảnh chia sẻ.
- [ ] Gửi `sitemap.xml` lên **Google Search Console**.
- [ ] Xác nhận **lịch sao lưu** cơ sở dữ liệu.

## 15.4. Liên hệ kỹ thuật
Mọi vấn đề kỹ thuật trong thời gian bảo hành, liên hệ đơn vị phát triển.

---

*Tài liệu này mô tả hệ thống tại thời điểm bàn giao. Cập nhật khi có thay đổi chức năng.*
