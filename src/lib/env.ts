// Kiểm tra biến môi trường bắt buộc khi khởi động, fail sớm thay vì lỗi mơ hồ lúc chạy.
function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Thiếu biến môi trường bắt buộc: ${name}`);
  }
  return value;
}

export const env = {
  databaseUrl: required("DATABASE_URL"),
  authSecret: required("AUTH_SECRET"),
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
    apiKey: process.env.CLOUDINARY_API_KEY ?? "",
    apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
  },
  resendApiKey: process.env.RESEND_API_KEY ?? "",
  // Email nhận phản ánh từ form "Lắng nghe dân nói"
  contactInbox: process.env.CONTACT_INBOX_EMAIL ?? "",
};
