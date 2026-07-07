"use client";

import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, localeNames, type Locale } from "@/lib/i18n/config";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();

  function switchLocale(next: Locale) {
    if (next === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=31536000;SameSite=Lax`;
    router.refresh();
  }

  return (
    <div className="flex items-center rounded-lg border border-zinc-200 bg-zinc-50 p-0.5 text-xs dark:border-zinc-700 dark:bg-zinc-900">
      {(Object.keys(localeNames) as Locale[]).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchLocale(code)}
          className={`rounded-md px-2 py-1 font-medium transition-colors ${
            locale === code
              ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
              : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          }`}
        >
          {localeNames[code]}
        </button>
      ))}
    </div>
  );
}
