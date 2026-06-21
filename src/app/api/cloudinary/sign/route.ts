import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { getCurrentUser } from "@/lib/auth-guards";

// Ký chữ ký cho upload có xác thực (signed upload) — secret luôn ở server.
// next-cloudinary <CldUploadWidget signatureEndpoint="/api/cloudinary/sign" />
// gọi POST với { paramsToSign }, nhận lại { signature }.
export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  const body = await request.json();
  const paramsToSign = body?.paramsToSign;
  if (!paramsToSign || typeof paramsToSign !== "object") {
    return NextResponse.json({ error: "Thiếu paramsToSign" }, { status: 400 });
  }

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET ?? "",
  );

  return NextResponse.json({ signature });
}
