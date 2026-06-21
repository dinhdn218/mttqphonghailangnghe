import { v2 as cloudinary } from "cloudinary";
import { env } from "@/lib/env";

// Cấu hình Cloudinary cho phần upload/biến đổi media phía server.
// Component upload phía client dùng next-cloudinary (<CldUploadWidget />).
cloudinary.config({
  cloud_name: env.cloudinary.cloudName,
  api_key: env.cloudinary.apiKey,
  api_secret: env.cloudinary.apiSecret,
  secure: true,
});

export { cloudinary };
