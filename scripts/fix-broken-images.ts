// Quét toàn bộ bài viết tìm ảnh trỏ ra domain ngoài (vd. Facebook fbcdn.net dán
// nhầm vào bài) rồi thử tải lại lên Cloudinary của mình. Ảnh Facebook dùng URL
// có chữ ký hết hạn sau vài ngày — nếu đã hết hạn thì không tải lại được nữa,
// script chỉ báo cáo để biên tập viên tự tải ảnh gốc lên lại qua CMS.
//
// Mặc định chạy dry-run (chỉ báo cáo). Thêm --apply để thực sự lưu vào DB.
//
// Chạy: npx tsx --env-file=.env scripts/fix-broken-images.ts [--apply]

import { prisma } from "../src/lib/prisma";
import { cloudinary } from "../src/lib/cloudinary";

const APPLY = process.argv.includes("--apply");
const SKIP_HOSTS = new Set(["res.cloudinary.com", "picsum.photos", "fastly.picsum.photos"]);

function extractImgSrcs(html: string): string[] {
  const out: string[] = [];
  for (const m of html.matchAll(/<img[^>]*\ssrc="([^"]+)"[^>]*>/g)) {
    out.push(m[1]);
  }
  return out;
}

function decodeEntities(s: string): string {
  return s.replace(/&amp;/g, "&").replace(/&quot;/g, '"');
}

async function rehost(url: string): Promise<{ ok: true; url: string } | { ok: false; reason: string }> {
  try {
    const result = await cloudinary.uploader.upload(url, {
      folder: "phonghailangnghe",
      resource_type: "image",
    });
    return { ok: true, url: result.secure_url };
  } catch (error) {
    return { ok: false, reason: error instanceof Error ? error.message : String(error) };
  }
}

async function main() {
  const posts = await prisma.post.findMany({
    select: { id: true, slug: true, contentVi: true, contentEn: true },
  });

  let totalExternal = 0;
  let totalRehosted = 0;
  let totalDead = 0;

  for (const post of posts) {
    const fields = { contentVi: post.contentVi, contentEn: post.contentEn ?? "" } as Record<
      "contentVi" | "contentEn",
      string
    >;
    const updates: Partial<typeof fields> = {};

    for (const key of ["contentVi", "contentEn"] as const) {
      let html = fields[key];
      if (!html) continue;

      const rawSrcs = extractImgSrcs(html);
      let changed = false;

      for (const rawSrc of rawSrcs) {
        const src = decodeEntities(rawSrc);
        let host: string;
        try {
          host = new URL(src).hostname;
        } catch {
          continue; // src tương đối/nội bộ, bỏ qua
        }
        if (SKIP_HOSTS.has(host)) continue;

        totalExternal++;
        const result = await rehost(src);
        if (result.ok) {
          totalRehosted++;
          console.log(`[OK]   ${post.slug} (${key}): ${host} -> Cloudinary`);
          html = html.split(rawSrc).join(result.url);
          changed = true;
        } else {
          totalDead++;
          console.log(`[CHẾT] ${post.slug} (${key}): ${src.slice(0, 90)}... — ${result.reason}`);
        }
      }

      if (changed) updates[key] = html;
    }

    if (Object.keys(updates).length > 0) {
      console.log(`  -> ${APPLY ? "ĐANG LƯU" : "(dry-run, chưa lưu)"} bài "${post.slug}"`);
      if (APPLY) {
        await prisma.post.update({ where: { id: post.id }, data: updates });
      }
    }
  }

  console.log("\n=== Tổng kết ===");
  console.log(`Ảnh ngoài tìm thấy: ${totalExternal}`);
  console.log(`Tải lại thành công: ${totalRehosted}`);
  console.log(`Không tải lại được (cần tải ảnh gốc lên lại thủ công): ${totalDead}`);
  if (!APPLY && totalRehosted > 0) {
    console.log("\nChạy lại với --apply để lưu các ảnh đã tải lại thành công vào DB.");
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
