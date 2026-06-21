import { PostStatus } from "@/generated/prisma/client";
import { STATUS_LABELS } from "@/lib/constants";

const STYLES: Record<PostStatus, string> = {
  DRAFT: "bg-gray-100 text-gray-700",
  PENDING: "bg-amber-100 text-amber-800",
  PUBLISHED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-700",
};

export function StatusBadge({ status }: { status: PostStatus }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${STYLES[status]}`}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}
