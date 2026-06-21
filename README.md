# Website tuyên truyền MTTQ xã Bắc Hà

Trang thông tin – tuyên truyền cho Ủy ban MTTQ Việt Nam xã Bắc Hà (Lào Cai).
Xem [CLAUDE.md](./CLAUDE.md) để biết bối cảnh, phạm vi và ràng buộc dự án.

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS 4**
- **PostgreSQL** + **Prisma 7** (driver adapter `@prisma/adapter-pg`)
- **Auth.js (NextAuth v5)** — đăng nhập credentials, 3 vai trò
- **Tiptap** (soạn thảo), **Cloudinary** (media), **next-intl** (Vi–En), **Resend** (email)

## Bắt đầu

1. Cài dependencies:

   ```bash
   npm install
   ```

2. Tạo file `.env` từ mẫu rồi điền giá trị:

   ```bash
   cp .env.example .env
   # Sinh AUTH_SECRET: npx auth secret
   ```

3. Cần một PostgreSQL đang chạy (sửa `DATABASE_URL`). Đẩy schema + seed dữ liệu mẫu:

   ```bash
   npm run db:push     # tạo bảng theo schema
   npm run db:seed     # tạo admin + 8 chuyên mục + bài demo
   ```

4. Chạy dev:

   ```bash
   npm run dev
   ```

   Mở http://localhost:3000 — khu vực quản trị ở `/admin` (yêu cầu đăng nhập).

## Tài khoản mặc định (từ seed) — để thử 3 vai trò

| Vai | Email | Mật khẩu |
| --- | --- | --- |
| Quản trị (ADMIN) | `admin@bachalangnghe.com` | `Admin@12345` |
| Biên tập (EDITOR) | `bientap@bachalangnghe.com` | `Test@12345` |
| Duyệt (APPROVER) | `duyet@bachalangnghe.com` | `Test@12345` |

> **Đổi mật khẩu / xoá tài khoản test trước khi sử dụng thật.** Tài khoản admin
> cấu hình qua `SEED_ADMIN_*` trong `.env`.

Luồng duyệt: Biên tập soạn bài (DRAFT) → **Gửi duyệt** (PENDING) → Cán bộ duyệt
**Duyệt & đăng** (PUBLISHED) hoặc **Trả lại** (REJECTED, kèm ghi chú). Chỉ bài
PUBLISHED mới hiển thị công khai.

## Scripts

| Lệnh | Mô tả |
| --- | --- |
| `npm run dev` | Chạy dev server |
| `npm run build` | Build production |
| `npm run typecheck` | Kiểm tra TypeScript |
| `npm run lint` | ESLint |
| `npm run db:push` | Đồng bộ schema vào DB (chưa tạo migration) |
| `npm run db:migrate` | Tạo & áp dụng migration |
| `npm run db:seed` | Seed dữ liệu mẫu |
| `npm run db:studio` | Mở Prisma Studio |

## Cấu trúc đã dựng

```
prisma/
  schema.prisma        # User+role, Category, Post (luồng duyệt), Media, Auth.js
  seed.ts              # admin + 8 chuyên mục + bài demo
src/
  auth.ts              # NextAuth: credentials + Prisma adapter
  auth.config.ts       # config edge-safe (dùng trong proxy)
  proxy.ts             # bảo vệ /admin (tên mới của middleware ở Next 16)
  lib/
    prisma.ts          # PrismaClient singleton (adapter pg)
    auth-guards.ts     # requireRole / can — phân quyền server-side
    cloudinary.ts      # cấu hình Cloudinary server
    constants.ts       # 8 chuyên mục, locale, nhãn vai/trạng thái
    env.ts             # kiểm tra biến môi trường
  app/
    page.tsx           # trang chủ tạm
    admin/page.tsx     # khu vực quản trị tạm
    api/auth/[...nextauth]/route.ts
```

## Việc tiếp theo (theo CLAUDE.md mục 10)

- [x] Khởi tạo Next.js + Prisma + PostgreSQL
- [x] Schema DB + Auth.js 3 vai + bảo vệ `/admin`
- [x] Khuôn Post chung: trang danh sách + chi tiết theo chuyên mục
- [x] CMS: dashboard + CRUD bài + luồng duyệt + Tiptap editor
- [x] Upload ảnh Cloudinary (signed): ảnh bìa + chèn ảnh trong bài
- [x] Đa ngôn ngữ next-intl (Vi–En): URL `/` (vi) + `/en`; admin chỉ tiếng Việt
- [x] Form "Lắng nghe dân nói" (`/lang-nghe-dan-noi`): gửi email Resend + honeypot + Turnstile (tuỳ chọn), không lưu DB
- [x] Bảo mật cơ bản: sanitize HTML (chống XSS), security headers, robots + sitemap
- [x] Tích hợp nền tảng: trang **Kết nối** (`/ket-noi`, Facebook/Zalo OA/TikTok + mã QR), **Giới thiệu** (`/gioi-thieu`), hotline ở footer
- [x] Hoàn thiện: phân trang chuyên mục, skeleton loading, trang 404 có thiết kế
- [ ] Deploy lên Vercel + trỏ tên miền (xem mục Triển khai)

> **Giới hạn đã biết:** trang 404 render đúng nhưng trả HTTP **200** (không phải 404)
> trên route công khai — do render động (streaming SSR) gửi status trước khi
> `notFound()` chạy. Hệ quả của URL tiếng Việt không tiền tố; tác động SEO thấp.

> **Cập nhật liên hệ/mạng xã hội:** sửa [src/lib/contacts.ts](src/lib/contacts.ts)
> — điền số hotline, email, và URL Facebook/Zalo OA/TikTok thật. Nền tảng có URL sẽ
> tự hiện kèm mã QR ở `/ket-noi`; để trống thì ẩn.

> **Ghi chú render:** trang công khai render động (SSR) — hệ quả của URL tiếng Việt
> không tiền tố (`localePrefix: as-needed`). Truy vấn Neon nhanh nên phù hợp với
> lưu lượng cấp xã. Muốn static hoàn toàn phải đổi sang `/vi` tiền tố (không nên).

## Triển khai (Vercel)

1. Push code lên GitHub, import vào **Vercel** (Framework: Next.js — tự nhận).
2. Khai báo **Environment Variables** trên Vercel (lấy từ `.env`):

   | Biến | Ghi chú |
   | --- | --- |
   | `DATABASE_URL` | Neon (dùng connection string **pooled**) |
   | `AUTH_SECRET` | `npx auth secret` |
   | `NEXT_PUBLIC_SITE_URL` | URL thật, vd `https://bachalangnghe.com` |
   | `CLOUDINARY_*` + `NEXT_PUBLIC_CLOUDINARY_*` | Cloudinary |
   | `RESEND_API_KEY`, `CONTACT_INBOX_EMAIL`, `RESEND_FROM` | Email phản ánh |
   | `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Captcha (tuỳ chọn) |

3. Tạo bảng + seed trên DB production (chạy 1 lần với `DATABASE_URL` production):
   `npm run db:push && npm run db:seed`.
4. **Đổi mật khẩu admin** và **xoá tài khoản test** (bientap@, duyet@) sau seed.
5. **Tên miền `bachalangnghe.com`**: xin quyền quản lý DNS từ cơ quan xã, trỏ về
   Vercel (CNAME/A theo hướng dẫn Vercel). Cập nhật domain trong Turnstile + Resend.
6. **Resend**: để gửi từ địa chỉ `@bachalangnghe.com` cần **verify tên miền** trong
   Resend (thêm bản ghi DNS). Trước khi có tên miền, dùng `onboarding@resend.dev`.
