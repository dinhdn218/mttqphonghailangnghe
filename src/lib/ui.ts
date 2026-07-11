// Lớp CSS dùng chung cho giao diện — khai báo một chỗ để các thành phần không
// bị lệch nhau theo thời gian.

// Ảnh trong thẻ tin (thẻ bấm được): phóng nhẹ khi rê chuột.
// Yêu cầu: thẻ cha có class `group`, khung ảnh có `overflow-hidden`.
// KHÔNG dùng cho ảnh tĩnh không bấm được (ảnh bìa trang chi tiết, ảnh trang
// Giới thiệu) — ở đó phóng ảnh là vô nghĩa.
export const CARD_IMAGE =
  "object-cover transition-transform duration-300 ease-out group-hover:scale-105";
