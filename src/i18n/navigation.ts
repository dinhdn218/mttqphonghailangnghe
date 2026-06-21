import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Link / useRouter / usePathname… nhận biết locale (tự thêm /en khi cần).
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
