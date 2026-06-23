import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { CATEGORIES } from "../src/lib/constants";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1) Tài khoản quản trị mặc định (đổi mật khẩu ngay sau khi bàn giao!)
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@phonghailangnghe.com";
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
    where: { email: "bientap@phonghailangnghe.com" },
    update: {},
    create: {
      email: "bientap@phonghailangnghe.com",
      name: "Biên tập viên",
      role: "EDITOR",
      passwordHash: staffHash,
    },
  });
  await prisma.user.upsert({
    where: { email: "duyet@phonghailangnghe.com" },
    update: {},
    create: {
      email: "duyet@phonghailangnghe.com",
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

  // 3) Một bài demo cho mỗi chuyên mục (đã đăng) để minh hoạ giao diện
  for (const c of CATEGORIES) {
    const category = await prisma.category.findUnique({ where: { slug: c.slug } });
    if (!category) continue;
    const slug = `demo-${c.slug}`;
    await prisma.post.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        titleVi: `Bài viết mẫu: ${c.nameVi}`,
        titleEn: `Sample post: ${c.nameEn}`,
        excerptVi: `Đây là bài viết mẫu minh hoạ chuyên mục ${c.nameVi}.`,
        contentVi: `<p>Nội dung mẫu cho chuyên mục <strong>${c.nameVi}</strong>. Cán bộ biên tập sẽ thay bằng nội dung thật qua CMS.</p>`,
        status: "PUBLISHED",
        publishedAt: new Date(),
        categoryId: category.id,
        authorId: admin.id,
      },
    });
  }
  console.log("✔ Đã seed bài viết demo");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
