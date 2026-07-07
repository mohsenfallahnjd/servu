import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import { normalizeServiceKey } from "@/lib/constants";
import type { Locale } from "@/lib/i18n/config";

export function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: Date | string, locale: Locale = "fa") {
  const tag = locale === "fa" ? "fa-IR" : "en-US";
  return new Intl.DateTimeFormat(tag, {
    year: "numeric",
    month: "short",
    day: "numeric",
    calendar: locale === "fa" ? "persian" : "gregory",
  }).format(new Date(date));
}

export function formatOdometer(
  value: number,
  unit: string,
  locale: Locale = "fa",
) {
  const tag = locale === "fa" ? "fa-IR" : "en-US";
  return `${value.toLocaleString(tag)} ${unit}`;
}

export function getServiceLabel(
  value: string,
  dict: Dictionary,
): string {
  const key = normalizeServiceKey(value);
  const services = dict.services as Record<string, string>;
  return services[key] ?? value;
}

export function formatCost(amount: number, locale: Locale): string {
  if (locale === "fa") {
    return `${amount.toLocaleString("fa-IR")} تومان`;
  }
  return `$${amount.toFixed(2)}`;
}
