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

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={dataUrl}
      alt={alt}
      width={size}
      height={size}
      className="border border-gray-200"
    />
  );
}
