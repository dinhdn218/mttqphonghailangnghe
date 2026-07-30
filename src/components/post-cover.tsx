import Image from "next/image";
import { Emblem } from "@/components/emblem";

// Khung ảnh bìa cho thẻ/trang bài viết. Component CHỈ lấp đầy (fill) khung ảnh —
// thẻ cha phải tự có `relative` + kích thước (giống như dùng trực tiếp <Image fill />).
// Không có coverImage thì hiển thị nền đỏ + biểu trưng thay vì ẩn hẳn khung ảnh,
// để các thẻ tin có/không ảnh vẫn đồng đều kích thước.
export function PostCoverFill({
  src,
  alt,
  sizes,
  className,
  priority,
}: {
  src: string | null;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        priority={priority}
      />
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-red-800 to-red-950 transition-transform duration-300 ease-out group-hover:scale-105">
      <Emblem className="h-1/4 w-1/4 min-h-10 min-w-10" />
    </div>
  );
}
