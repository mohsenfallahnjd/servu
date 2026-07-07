export type Locale = "en" | "fa";

export const locales: Locale[] = ["en", "fa"];
export const defaultLocale: Locale = "fa";

export const localeNames: Record<Locale, string> = {
  en: "English",
  fa: "فارسی",
};

export const LOCALE_COOKIE = "servu-locale";
