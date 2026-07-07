"use client";

import { SessionProvider } from "next-auth/react";
import type { Locale } from "@/lib/i18n/config";
import { LocaleProvider } from "@/components/locale-provider";

export function Providers({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <LocaleProvider locale={locale}>
      <SessionProvider>{children}</SessionProvider>
    </LocaleProvider>
  );
}
