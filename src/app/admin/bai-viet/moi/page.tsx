import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth-guards";
import { canCreatePost } from "@/lib/post-permissions";
import { prisma } from "@/lib/prisma";
import { PostForm } from "../post-form";

export const metadata = { title: "Viết bài mới" };

export default async function NewPostPage() {
  const user = await requireUser();
  if (!canCreatePost(user)) redirect("/admin/bai-viet");

  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    select: { id: true, nameVi: true },
  });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Viết bài mới</h1>
      <PostForm categories={categories} />
    </div>
  );
}
