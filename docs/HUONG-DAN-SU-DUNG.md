# HƯỚNG DẪN SỬ DỤNG

## Cổng thông tin điện tử — Ủy ban MTTQ Việt Nam xã Phong Hải

| | |
|---|---|
| **Dành cho** | Cán bộ quản trị, biên tập, duyệt bài của xã |
| **Địa chỉ trang** | https://mttqphonghailangnghe.com |
| **Địa chỉ quản trị** | https://mttqphonghailangnghe.com/dang-nhap |
| **Phiên bản** | 1.0 |

> Tài liệu này hướng dẫn **thao tác hằng ngày**, viết cho người không chuyên
> tin học. Phần kỹ thuật (cơ sở dữ liệu, triển khai, bảo mật) nằm ở tài liệu
> riêng `TAI-LIEU-DU-AN.md` dành cho bên kỹ thuật.

---

# 1. Những điều cần biết trước

## 1.1. Trang web gồm hai phần

- **Trang công khai** — người dân nhìn thấy. Không cần đăng nhập.
- **Khu quản trị** (gọi tắt là **CMS**) — nơi cán bộ đăng bài, sửa thông tin.
  Phải đăng nhập mới vào được.

## 1.2. Ba vai trò

Mỗi tài khoản có **một vai**. Vai quyết định người đó được làm gì:

| Vai | Làm được gì | Không làm được gì |
|---|---|---|
| **Quản trị** | Toàn quyền: viết, duyệt, đăng, gỡ, xoá, sửa cấu hình, tạo tài khoản | — |
| **Biên tập** | Viết bài, sửa bài của mình, gửi duyệt | **Không tự đăng bài** lên trang; không sửa cấu hình; không tạo tài khoản |
| **Duyệt** | Duyệt hoặc trả lại bài đang chờ; đánh dấu bài nổi bật | Không soạn nội dung; không sửa cấu hình |

> **Vì sao Biên tập không được tự đăng?** Đây là chủ ý: mọi bài phải qua một
> người thứ hai xem lại trước khi ra công khai, tránh đăng nhầm thông tin sai.

## 1.3. Bốn trạng thái của bài viết

| Trạng thái | Nghĩa là | Người dân thấy chưa? |
|---|---|---|
| **Bản nháp** | Đang soạn, chưa gửi đi đâu cả | Chưa |
| **Chờ duyệt** | Đã gửi, đang đợi người có vai Duyệt xem | Chưa |
| **Đã đăng** | Đã được duyệt, đang hiển thị công khai | **Rồi** |
| **Bị trả lại** | Người duyệt yêu cầu sửa, kèm ghi chú lý do | Chưa |

---

# 2. Đăng nhập lần đầu

1. Mở trình duyệt, vào địa chỉ: **…/dang-nhap**
2. Nhập **email** và **mật khẩu** được cấp.
3. Bấm **Đăng nhập**.

Vào được rồi, việc **đầu tiên nên làm là đổi mật khẩu**:

1. Bấm tên mình ở góc trên bên phải → **Tài khoản**.
2. Nhập **Mật khẩu hiện tại**, rồi **Mật khẩu mới** (tối thiểu 8 ký tự) và
   **Xác nhận mật khẩu mới**.
3. Bấm **Lưu thay đổi**.

> **Quên mật khẩu?** Hệ thống chưa có chức năng tự đặt lại qua email. Liên hệ
> người có vai **Quản trị** để được cấp lại mật khẩu mới (xem mục 8.2).

## Menu bên trái

Sau khi đăng nhập, cột đỏ bên trái là menu chính:

| Mục | Dùng để |
|---|---|
| **Tổng quan** | Xem nhanh số bài, bài chờ duyệt, phản ánh mới |
| **Bài viết** | Danh sách toàn bộ bài — nơi viết và sửa bài |
| **Bài nổi bật** | Chọn bài lên trang chủ *(Quản trị, Duyệt)* |
| **Thư viện** | Kho ảnh và video đã tải lên |
| **Phản ánh** | Ý kiến người dân gửi qua trang web |
| **Người dùng** | Tạo, sửa tài khoản cán bộ *(chỉ Quản trị)* |
| **Cấu hình** | Số điện thoại, địa chỉ, link mạng xã hội *(chỉ Quản trị)* |

Dưới cùng có nút **← Về trang web** để xem trang công khai.

---

# 3. Viết và đăng một bài

Đây là việc làm nhiều nhất. Luồng đầy đủ:

```
Biên tập viết bài  →  Gửi duyệt  →  Người duyệt xem  →  Duyệt & đăng
                                          ↓
                                     Trả lại (kèm lý do)
                                          ↓
                                  Biên tập sửa, gửi lại
```

## 3.1. Tạo bài mới

1. Vào **Bài viết** → bấm **+ Viết bài mới**.
2. Điền các ô (ô có dấu **\*** là bắt buộc):

   | Ô | Ghi chú |
   |---|---|
   | **Chuyên mục \*** | Chọn đúng mục bài thuộc về (Tin tức, Chuyển đổi số…) |
   | **Ảnh bìa** | Bấm **Tải ảnh bìa lên**. Đây là ảnh hiện ở danh sách và khi chia sẻ lên Facebook/Zalo |
   | **Bài nổi bật** | Tích vào nếu muốn bài lên khối đầu trang chủ |
   | **Tiêu đề \*** | Tên bài |
   | **Tóm tắt** | 1–2 câu, hiện ở danh sách. Bỏ trống cũng được |
   | **Nội dung \*** | Nội dung chính của bài |

3. Bấm **Tạo bài (lưu nháp)**.

> **Chưa xong thì cứ lưu nháp.** Bài nháp chỉ mình thấy, người dân không thấy.
> Lần sau vào **Bài viết** mở ra viết tiếp, bấm **Lưu thay đổi**.

## 3.2. Định dạng nội dung

Thanh công cụ phía trên ô **Nội dung**:

| Nút | Tác dụng |
|---|---|
| **B** | Chữ đậm |
| *I* | Chữ nghiêng |
| **S** | Gạch ngang |
| **H2**, **H3** | Đề mục lớn / đề mục nhỏ — dùng chia bài thành phần cho dễ đọc |
| **• Danh sách** | Danh sách gạch đầu dòng |
| **1. Số** | Danh sách đánh số |
| **❝ Trích** | Trích dẫn (lời phát biểu, trích văn bản) |
| **🔗 Liên kết** | Chèn đường dẫn |
| **🖼 Ảnh** | Chèn ảnh vào giữa bài |
| **↶ ↷** | Hoàn tác / làm lại |

**Mẹo soạn bài dễ đọc trên điện thoại:**
- Viết đoạn ngắn, 3–4 dòng một đoạn.
- Bài dài nên chia bằng đề mục **H2**.
- Nội dung có thể **soạn sẵn ở Word rồi dán vào** — định dạng cơ bản giữ nguyên.

## 3.3. Phần tiếng Anh

Bên dưới có khung **Tiếng Anh (tuỳ chọn)**. **Bỏ trống hoàn toàn cũng được** —
khi đó người xem bản tiếng Anh sẽ thấy nội dung tiếng Việt. Chỉ điền khi thật
sự cần.

## 3.4. Gửi duyệt

Soạn xong, trong bài bấm **Gửi duyệt** (nút màu cam, ở khung **Thao tác**).

Bài chuyển sang **Chờ duyệt**. Từ lúc này **không sửa được nữa** cho tới khi
người duyệt xử lý — trừ khi bạn là Quản trị.

## 3.5. Duyệt bài *(vai Duyệt / Quản trị)*

1. Vào **Bài viết**, lọc trạng thái **Chờ duyệt**.
2. Mở bài, đọc lại nội dung.
3. Ở khung **Thao tác** chọn một trong hai:
   - **Duyệt & đăng** (nút xanh lá) → bài công khai **ngay lập tức**.
   - **Trả lại…** (nút viền đỏ) → mở ô **Lý do / ghi chú cho biên tập**, ghi rõ
     cần sửa gì rồi bấm **Xác nhận trả lại**.

> **Ghi lý do càng rõ càng tốt** — người viết đọc ghi chú này để biết sửa chỗ
> nào. Ví dụ "Cần bổ sung ảnh và sửa lại tiêu đề cho ngắn hơn".

## 3.6. Bài bị trả lại thì làm gì

Người viết mở bài (trạng thái **Bị trả lại**), đọc ghi chú màu đỏ ở đầu trang,
sửa nội dung, bấm **Lưu thay đổi** rồi bấm **Gửi duyệt** lại.

## 3.7. Gỡ bài đã đăng *(chỉ Quản trị)*

Mở bài → **Gỡ đăng**. Bài quay về bản nháp, người dân không còn thấy. Sửa xong
có thể gửi duyệt lại.

## 3.8. Xoá bài

Mở bài → **Xoá bài…** → **Xác nhận xoá**.

> ⚠️ **Xoá là mất hẳn, không khôi phục được.** Nếu chỉ muốn tạm ẩn khỏi trang
> thì dùng **Gỡ đăng**, đừng xoá.
>
> Biên tập chỉ xoá được **bài nháp của chính mình**. Quản trị xoá được mọi bài.

---

# 4. Đưa bài lên trang chủ

Khối đầu trang chủ hiển thị **10 bài**: 1 tin lớn có ảnh to, 2 tin phụ, và 7
tin trong hộp "Tin tiêu điểm". Bài mới nhất xếp trước.

1. Vào **Bài nổi bật**.
2. Bấm ngôi sao **☆** ở bài muốn đưa lên (thành **★** là đã bật).
3. Bấm lại **★** để bỏ.

Nếu số bài được đánh dấu **chưa đủ 10**, hệ thống **tự lấy thêm bài mới nhất**
cho đầy — trang chủ không bao giờ bị trống.

---

# 5. Ảnh và video

## 5.1. Tải ảnh lên

Có hai đường:
- **Trong lúc viết bài** — nút **Tải ảnh bìa lên** (ảnh bìa) hoặc **🖼 Ảnh**
  trên thanh công cụ (ảnh giữa bài).
- **Vào Thư viện** → tải lên trước, dùng sau.

Ảnh tải lên được **tự động nén và tối ưu**, không cần chỉnh sửa trước.

## 5.2. Dùng lại ảnh cũ

Vào **Thư viện**, tìm ảnh, bấm **Sao chép URL** rồi dán vào chỗ cần.

## 5.3. Xoá ảnh

Trong **Thư viện** bấm xoá ở ảnh không dùng nữa.

> ⚠️ **Kiểm tra trước khi xoá.** Nếu ảnh đang được dùng trong một bài đã đăng,
> xoá đi thì chỗ đó trong bài sẽ bị vỡ ảnh.

## 5.4. Lời khuyên về ảnh

- Ảnh bìa nên là ảnh **ngang** (không phải ảnh dọc) để hiển thị đẹp.
- Ảnh chụp từ điện thoại dùng thẳng được, không cần chỉnh.
- **Không lấy ảnh có logo/watermark của báo khác** — vi phạm bản quyền. Ưu tiên
  ảnh do cán bộ xã tự chụp.

---

# 6. Xử lý phản ánh của dân

Người dân gửi ý kiến qua trang **Lắng nghe dân nói**. Phản ánh **gửi thẳng vào
email** của xã, đồng thời lưu lại trong CMS để theo dõi.

1. Có phản ánh mới, menu **Phản ánh** hiện **số đếm** bên cạnh.
2. Vào **Phản ánh**, mở một mục để xem **Người gửi** và **Nội dung**.
3. Số điện thoại và email của người gửi **bấm được để gọi / gửi mail thẳng**.
4. Xử lý xong bấm **Đã xử lý** để đánh dấu.

> Có thể **Xoá** phản ánh (rác, trùng lặp). Xoá là mất hẳn.

---

# 7. Sửa thông tin chung của trang *(chỉ Quản trị)*

Vào **Cấu hình**. Sửa xong bấm **Lưu cấu hình** — **áp dụng ngay** ra trang công khai.

## Nhóm TRANG
- **Tên cơ quan** (Việt / Anh) — hiện ở đầu trang, chân trang, tiêu đề trình
  duyệt và khi chia sẻ lên mạng xã hội. Sửa một chỗ, cả trang đổi theo.
- **Mô tả ngắn** (Việt / Anh) — Google và thẻ chia sẻ dùng đoạn này. Nên 120–160 ký tự.

## Nhóm LIÊN HỆ
- **Đường dây nóng**, **Email tiếp nhận**, **Địa chỉ**.

> **Số điện thoại:** nhập liền (`0982832656`) hay có dấu cách đều được — ra
> trang công khai hệ thống **tự tách nhóm cho dễ đọc** (`0982 832 656`), còn nút
> bấm gọi vẫn hoạt động đúng.
>
> **Email tiếp nhận để trống** thì phần email tự ẩn trên trang, không hiện ô trống.

## Nhóm NỀN TẢNG
- Link **Facebook**, **Zalo**, **TikTok**.

> Nền tảng nào **để trống thì tự ẩn** khỏi trang Kết nối và nút nổi — không để
> lại liên kết chết. **Mã QR sinh tự động** từ link, đổi link là QR đổi theo,
> không cần thiết kế lại ảnh.
>
> **Zalo:** nên dùng link **Official Account (OA)** của xã. Nếu chưa có OA, dùng
> tạm `zalo.me/<số điện thoại>` của văn phòng xã.

---

# 8. Quản lý tài khoản cán bộ *(chỉ Quản trị)*

## 8.1. Thêm người dùng

**Người dùng** → **+ Thêm người dùng** → nhập họ tên, email, mật khẩu, chọn vai
→ lưu. Báo email và mật khẩu cho người đó, dặn **đổi mật khẩu ngay lần đầu**.

## 8.2. Đặt lại mật khẩu cho người khác

Mở người đó trong **Người dùng** → đặt mật khẩu mới → lưu → báo lại cho họ.

## 8.3. Đổi vai hoặc xoá

Mở người đó để đổi vai hoặc xoá. **Không xoá được** trong 3 trường hợp:
- Xoá chính mình
- Xoá người **Quản trị cuối cùng** (phải luôn còn ít nhất một Quản trị)
- Xoá người **đang còn bài viết** (chuyển bài hoặc xoá bài trước)

---

# 9. Xử lý sự cố thường gặp

| Hiện tượng | Nguyên nhân & cách xử lý |
|---|---|
| Đăng nhập báo sai mật khẩu nhiều lần rồi **không vào được nữa** | Hệ thống **khoá tạm 15 phút** sau 5 lần sai, để chống dò mật khẩu. Đợi 15 phút rồi thử lại, hoặc nhờ Quản trị đặt lại mật khẩu. |
| Viết bài xong **không thấy nút Gửi duyệt** | Bài phải ở trạng thái **Bản nháp** hoặc **Bị trả lại**. Nếu đang **Chờ duyệt** thì đã gửi rồi, đợi người duyệt. |
| Bài đã duyệt nhưng **trang chủ chưa thấy** | Trang chủ chỉ hiện **bài nổi bật**. Vào **Bài nổi bật** bấm ★. Bài vẫn luôn hiện trong chuyên mục của nó. |
| **Không thấy menu Cấu hình / Người dùng** | Hai mục này **chỉ vai Quản trị** mới thấy. |
| Sửa cấu hình rồi mà **trang chưa đổi** | Bấm **Lưu cấu hình** chưa? Nếu rồi, tải lại trang (Ctrl+F5 / Cmd+Shift+R). |
| Chuyên mục hiện **"Chưa có bài viết trong chuyên mục này"** | Đúng — chuyên mục đó chưa có bài nào **đã đăng**. Đăng bài vào là hết. |
| Tải ảnh lên **báo lỗi** | Kiểm tra mạng; thử ảnh nhỏ hơn. Ảnh quá lớn (trên ~10MB) nên giảm kích thước trước. |
| Người dân **không gửi được phản ánh** | Có thể do phần chống spam. Báo bên kỹ thuật kiểm tra. |

---

# 10. Việc nên làm định kỳ

| Việc | Tần suất |
|---|---|
| Kiểm tra mục **Phản ánh**, xử lý ý kiến người dân | Hằng tuần |
| Cập nhật bài mới cho các chuyên mục | Đều đặn |
| Rà lại **Bài nổi bật** cho trang chủ khỏi cũ | Hằng tháng |
| Dọn ảnh không dùng trong **Thư viện** | Vài tháng một lần |
| Rà soát danh sách **Người dùng**, khoá tài khoản người đã chuyển công tác | Khi có thay đổi nhân sự |
| Đổi mật khẩu | 6 tháng một lần |

---

# 11. Nguyên tắc an toàn

- **Không dùng chung tài khoản.** Mỗi cán bộ một tài khoản riêng để biết ai làm gì.
- **Không đưa mật khẩu qua tin nhắn nhóm.** Báo riêng cho từng người.
- **Đăng xuất khi dùng máy chung.** Bấm **Đăng xuất** ở góc trên bên phải.
- Phiên đăng nhập **tự hết hạn sau 8 giờ**.
- **Kiểm tra kỹ trước khi bấm Duyệt & đăng** — bài ra công khai ngay, người dân
  có thể đã đọc và chụp lại trước khi kịp gỡ.
- **Không đăng thông tin cá nhân của người dân** (số điện thoại, địa chỉ nhà,
  hình ảnh trẻ em…) khi chưa được đồng ý.

---

# 12. Cần hỗ trợ

Khi gặp lỗi không tự xử lý được, liên hệ bên kỹ thuật và mô tả giúp:

1. **Đang làm gì** thì gặp lỗi (ví dụ: "đang bấm Duyệt & đăng bài …").
2. **Màn hình báo gì** — chụp màn hình lại càng tốt.
3. **Tài khoản nào** đang đăng nhập (email, vai).

> Website được **bảo hành 12 tháng** kể từ ngày nghiệm thu: mọi lỗi phát sinh từ
> phần mềm đều được sửa miễn phí trong thời gian này.
