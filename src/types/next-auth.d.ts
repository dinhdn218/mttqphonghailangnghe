import type { DefaultSession } from "next-auth";
import type { Role } from "@/generated/prisma/client";

// Mở rộng kiểu của Auth.js để có thêm id + role trong session/token.
declare module "next-auth" {
  interface User {
    role: Role;
  }
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}
