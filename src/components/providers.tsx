"use client";

import { SessionProvider } from "next-auth/react";
import { HeroUIProvider, ToastProvider } from "@heroui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <HeroUIProvider>
        <ToastProvider placement="top-center" />
        {children}
      </HeroUIProvider>
    </SessionProvider>
  );
}
