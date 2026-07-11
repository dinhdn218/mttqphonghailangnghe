import QRCode from "qrcode";

// Sinh mã QR phía server thành data URL rồi render <img>.
// (Hoa văn thổ cẩm là phần thiết kế — có thể chỉnh màu/khung sau.)
export async function QrCode({
  value,
  size = 160,
  alt = "Mã QR",
}: {
  value: string;
  size?: number;
  alt?: string;
}) {
  const dataUrl = await QRCode.toDataURL(value, {
    width: size,
    margin: 1,
    color: { dark: "#7f1d1d", light: "#ffffff" }, // đỏ chủ đạo
  });

  return (
    // Ảnh là data URL sinh tại chỗ (không phải ảnh từ mạng) → next/image không
    // tối ưu được gì, dùng <img> là đúng.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={dataUrl}
      alt={alt}
      width={size}
      height={size}
      className="border border-gray-200"
    />
  );
}
