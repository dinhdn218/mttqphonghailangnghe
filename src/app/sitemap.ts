import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { CATEGORIES } from "@/lib/constants";
import { PostStatus } from "@/generated/prisma/client";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://phonghailangnghe.com";

// Sinh lúc request (không prerender lúc build) — tránh phụ thuộc DB khi build
// và luôn phản ánh bài mới nhất.
export const dynamic = "force-dynamic";

// Tạo URL cho cả 2 ngôn ngữ: tiếng Việt (gốc) + tiếng Anh (/en).
function bothLocales(path: string): string[] {
  return [`${base}${path}` || base, `${base}/en${path}`];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Không để DB tạm lỗi lúc build làm sập cả deploy — sitemap vẫn ra phần tĩnh.
  let posts: { slug: string; updatedAt: Date }[] = [];
  try {
    posts = await prisma.post.findMany({
      where: { status: PostStatus.PUBLISHED },
      select: { slug: true, updatedAt: true },
    });
  } catch (e) {
    console.error("sitemap: không truy vấn được bài viết:", e);
  }

  const entries: MetadataRoute.Sitemap = [];

  for (const url of bothLocales("")) {
    entries.push({ url, changeFrequency: "daily", priority: 1 });
  }
  for (const url of bothLocales("/lang-nghe-dan-noi")) {
    entries.push({ url, changeFrequency: "monthly", priority: 0.5 });
  }
  for (const c of CATEGORIES) {
    for (const url of bothLocales(`/chuyen-muc/${c.slug}`)) {
      entries.push({ url, changeFrequency: "weekly", priority: 0.7 });
    }
  }
  for (const p of posts) {
    for (const url of bothLocales(`/bai-viet/${p.slug}`)) {
      entries.push({
        url,
        lastModified: p.updatedAt,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
