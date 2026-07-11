# Dự án: Website tuyên truyền MTTQ xã Phong Hải

> File này tóm tắt context dự án cho Claude Code. Đọc kỹ trước khi bắt đầu.

## 1. Mục tiêu

Xây dựng **trang thông tin – tuyên truyền** cho Ủy ban MTTQ Việt Nam và các tổ chức
chính trị – xã hội của xã Phong Hải (Lào Cai). Đây là dự án freelance, mình (dev) đứng
ra nhận và tự code toàn bộ.

Website tham chiếu (mẫu khách muốn làm tương tự): `bachalangnghe.vn` của một xã khác.
Tên miền đích: `phonghailangnghe.com` (xem mục Ràng buộc & rủi ro bên dưới — tên miền này
đã có chủ).

Người dùng cuối chủ yếu là người dân vùng dân tộc thiểu số, **truy cập bằng điện thoại**
→ ưu tiên tối ưu mobile.

## 2. Hồ sơ dev (để chọn giải pháp phù hợp)

- Hơn 4 năm lập trình, **mạnh frontend (React), yếu backend**.
- Tự code toàn bộ hệ thống (không dùng WordPress dựng sẵn).
- Vì backend yếu → chọn stack giảm tối đa gánh nặng backend, dùng thư viện sẵn có
  cho phần rủi ro (auth, ORM) thay vì tự dựng từ số 0.

## 3. Stack công nghệ đã chốt

- **Framework:** Next.js (full-stack, App Router) + TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma (tránh viết SQL tay)
- **Auth & phân quyền:** Auth.js (NextAuth) — KHÔNG tự code login/session từ đầu
- **Trình soạn thảo bài viết:** Tiptap (cán bộ gõ bài như Word)
- **Lưu trữ ảnh/video:** Cloudinary (tự tối ưu media)
- **Đa ngôn ngữ:** next-intl (Anh – Việt)
- **Gửi email (form):** Resend hoặc Nodemailer
- **Triển khai:** Vercel (hoặc VPS nếu khách yêu cầu dữ liệu đặt tại VN)

## 4. Phạm vi chức năng

### 11 chuyên mục công khai
Phần lớn dùng chung MỘT khuôn "post type" (trang danh sách + trang chi tiết), phân loại
theo chuyên mục — KHÔNG code 11 lần:

1. Tin tức – Sự kiện
2. Chuyển đổi số cộng đồng
3. Hướng dẫn dịch vụ công trực tuyến
4. Mô hình hay – Phong trào thi đua
5. Các cuộc vận động
6. Gương người tốt việc tốt
7. Cải tạo tập tục – đời sống văn hóa mới
8. Thư viện (văn bản / ảnh / video / infographic)
9. **Lắng nghe dân nói** — form tiếp nhận phản ánh, GỬI VỀ EMAIL (có chống spam/captcha).
   KHÔNG cần hệ thống quản lý phản ánh, không lưu DB.
10. Zalo OA (xã) — nhúng link. (Zalo OA tỉnh ĐÃ BỎ theo yêu cầu khách.)
11. Mã QR cho các nền tảng — yêu cầu thiết kế QR có hoa văn thổ cẩm (phần thiết kế, không phải code)

### Tích hợp nền tảng
Liên kết Facebook, Zalo OA, TikTok, đường dây nóng; hiển thị mã QR từng nền tảng.

### Nội dung đa phương tiện
Hỗ trợ video ngắn, ảnh, infographic. Đa ngôn ngữ **Anh – Việt**.

## 5. Hệ quản trị (CMS) — phần nặng nhất

- Phân quyền **3 vai:** Quản trị / Biên tập / Duyệt.
- Luồng kiểm duyệt: bài viết phải được DUYỆT trước khi đăng công khai.
- Quản lý media (upload, tối ưu, nhúng ảnh/video/infographic).
- Quản lý nội dung song ngữ Anh – Việt.

## 6. Phạm vi nội dung

- Dev làm **content tĩnh** (giao diện, trang giới thiệu cố định) trong quá trình phát triển.
- Dev tạo **vài bài + ảnh mẫu demo** cho mỗi chuyên mục để minh họa cách dùng.
- **Nội dung thật do KHÁCH tự soạn và nhập qua CMS** sau khi bàn giao.

## 7. Phi chức năng

- Tối ưu mobile (ưu tiên hàng đầu).
- CMS đơn giản để cán bộ không chuyên IT tự dùng.
- **An toàn thông tin:** mức cơ bản tương ứng hệ thống cấp độ 1 theo Nghị định 85/2016/NĐ-CP
  (HTTPS/SSL, sao lưu định kỳ, phân quyền, chống SQL injection/XSS, cập nhật bản vá).
  Việc lập hồ sơ đề xuất cấp độ / thẩm định thuộc trách nhiệm bên chủ quản (cơ quan), KHÔNG phải dev.
- Sao lưu dữ liệu định kỳ.

## 8. Thương mại (để hiểu bối cảnh, không ảnh hưởng code)

- Hợp đồng cá nhân, dev đứng tên ký. Bên chi khấu trừ 10% thuế TNCN.
- Tổng giá: 38 triệu VND (đã gồm thuế). Ngân sách xã: 30–40 triệu gồm cả phí duy trì.
- **Bảo hành 12 tháng** kể từ nghiệm thu: sửa miễn phí mọi bug từ source code do dev phát triển.
  → Lưu ý khi code: ưu tiên sự ổn định và dễ bảo trì, vì dev phải tự bảo hành 1 năm.
- Hosting do dev lo; phí duy trì hằng năm tính riêng.

## 9. Ràng buộc & rủi ro cần biết

- ~~Tên miền đã có chủ, không mua mới được~~ → **ĐÃ GIẢI QUYẾT:** dev đã **tự mua
  `phonghailangnghe.com` trên Vercel**. Tên miền nằm cùng nền tảng deploy nên Vercel
  tự cấp SSL + cấu hình DNS, không cần xin quyền DNS từ cơ quan nữa.
  → Khi bàn giao: cần thoả thuận chuyển quyền sở hữu tên miền cho cơ quan (hoặc dev
  giữ và tính vào phí duy trì hằng năm).
- Backend là điểm yếu của dev → phần CMS/auth/DB là rủi ro tiến độ lớn nhất.
  Bám sát thư viện sẵn có (Auth.js, Prisma), không tự dựng từ đầu.
- Dự án của cơ quan nhà nước → quy trình duyệt chậm, yêu cầu có thể thay đổi.

## 10. Việc nên làm trước (gợi ý thứ tự)

1. Khởi tạo dự án Next.js + TypeScript + Prisma + PostgreSQL.
2. Thiết kế schema DB: User (kèm role), Post (kèm trạng thái duyệt, ngôn ngữ, chuyên mục),
   Category, Media.
3. Dựng Auth.js với 3 vai trò + middleware phân quyền.
4. Dựng khuôn Post chung + trang danh sách/chi tiết, rồi map ra 11 chuyên mục.
5. CMS: CRUD bài viết + luồng duyệt + Tiptap editor + upload Cloudinary.
6. Đa ngôn ngữ next-intl (Anh – Việt).
7. Form "Lắng nghe dân nói" + gửi email + captcha.
8. Responsive mobile, tối ưu, bảo mật cơ bản, deploy.
