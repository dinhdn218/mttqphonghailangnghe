import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { CATEGORIES } from "../src/lib/constants";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1) Tài khoản quản trị mặc định (đổi mật khẩu ngay sau khi bàn giao!)
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@mttqphonghailangnghe.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "Admin@12345";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Quản trị viên",
      role: "ADMIN",
      passwordHash,
    },
  });
  console.log(`✔ Admin: ${admin.email}`);

  // 1b) Tài khoản Biên tập + Duyệt để thử nghiệm phân quyền.
  //     (Đổi mật khẩu / xoá trước khi đưa vào sử dụng thật.)
  const staffHash = await bcrypt.hash("Test@12345", 10);
  await prisma.user.upsert({
    where: { email: "bientap@mttqphonghailangnghe.com" },
    update: {},
    create: {
      email: "bientap@mttqphonghailangnghe.com",
      name: "Biên tập viên",
      role: "EDITOR",
      passwordHash: staffHash,
    },
  });
  await prisma.user.upsert({
    where: { email: "duyet@mttqphonghailangnghe.com" },
    update: {},
    create: {
      email: "duyet@mttqphonghailangnghe.com",
      name: "Cán bộ duyệt",
      role: "APPROVER",
      passwordHash: staffHash,
    },
  });
  console.log("✔ Tài khoản Biên tập + Duyệt (mật khẩu: Test@12345)");

  // 2) 8 chuyên mục nội dung
  for (const [index, c] of CATEGORIES.entries()) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: { nameVi: c.nameVi, nameEn: c.nameEn, order: index },
      create: { slug: c.slug, nameVi: c.nameVi, nameEn: c.nameEn, order: index },
    });
  }
  console.log(`✔ Đã seed ${CATEGORIES.length} chuyên mục`);

  // 3) ~10 bài mẫu / chuyên mục — có ảnh thumb (coverImage) + ảnh kèm chú thích
  //    trong nội dung. Ảnh dùng picsum.photos (placeholder cho dữ liệu demo).
  await prisma.post.deleteMany({ where: { slug: { startsWith: "demo-" } } });

  const PREFIXES = [
    "Hội nghị", "Triển khai", "Lan toả", "Đẩy mạnh", "Ra mắt",
    "Tăng cường", "Hưởng ứng", "Biểu dương", "Tổng kết", "Phát động",
  ];
  const TOPICS: Record<string, string> = {
    "tin-tuc-su-kien": "các hoạt động, sự kiện nổi bật tại xã Phong Hải",
    "chuyen-doi-so": "chuyển đổi số trong cộng đồng dân cư",
    "dich-vu-cong": "dịch vụ công trực tuyến phục vụ người dân",
    "mo-hinh-hay": "mô hình hay trong phong trào thi đua yêu nước",
    "cuoc-van-dong": "cuộc vận động Toàn dân đoàn kết xây dựng đời sống văn hoá",
    "nguoi-tot-viec-tot": "gương người tốt, việc tốt trong cộng đồng",
    "doi-song-van-hoa-moi": "nếp sống văn hoá mới, xoá bỏ hủ tục lạc hậu",
    "thu-vien": "tư liệu, hình ảnh tuyên truyền của xã",
  };

  let count = 0;
  for (const c of CATEGORIES) {
    const category = await prisma.category.findUnique({ where: { slug: c.slug } });
    if (!category) continue;
    const topic = TOPICS[c.slug] ?? c.nameVi.toLowerCase();

    for (let n = 1; n <= 10; n++) {
      const slug = `${c.slug}-${n}`;
      const title = `${PREFIXES[n - 1]} ${topic}`;
      const cover = `https://picsum.photos/seed/${slug}/800/450`;
      const figImg = `https://picsum.photos/seed/${slug}-fig/1000/600`;
      const contentVi = `<p>Trong khuôn khổ các hoạt động của Ủy ban MTTQ Việt Nam xã Phong Hải, nội dung về <strong>${topic}</strong> tiếp tục được quan tâm, triển khai sâu rộng tới từng thôn, bản.</p>` +
        `<p>Các tổ chức thành viên cùng đông đảo nhân dân đã tích cực tham gia, góp phần lan toả những giá trị tốt đẹp trong cộng đồng.</p>` +
        `<figure><img src="${figImg}" alt="${title}" /><figcaption>Ảnh minh hoạ: ${title}.</figcaption></figure>` +
        `<p>Thời gian tới, xã tiếp tục đẩy mạnh tuyên truyền, vận động để ${topic} ngày càng đi vào thực chất, hiệu quả.</p>`;

      await prisma.post.upsert({
        where: { slug },
        update: { titleVi: title, excerptVi: `${title} — tin tổng hợp từ xã Phong Hải.`, contentVi, coverImage: cover, status: "PUBLISHED", categoryId: category.id },
        create: {
          slug,
          titleVi: title,
          excerptVi: `${title} — tin tổng hợp từ xã Phong Hải.`,
          contentVi,
          coverImage: cover,
          status: "PUBLISHED",
          publishedAt: new Date(Date.now() - count * 6 * 3600 * 1000),
          categoryId: category.id,
          authorId: admin.id,
        },
      });
      count++;
    }
  }
  console.log(`✔ Đã seed ${count} bài mẫu (10/chuyên mục) — có ảnh thumb + ảnh chú thích`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
