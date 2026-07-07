import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import { normalizeServiceKey, parseServiceEntry } from "@/lib/constants";
import { formatJalaliDate } from "@/lib/jalali";
import type { Locale } from "@/lib/i18n/config";

export function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: Date | string, locale: Locale = "fa") {
  if (locale === "fa") {
    return formatJalaliDate(date, "long");
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
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
  const { key } = parseServiceEntry(value);
  const normalized = normalizeServiceKey(key);
  const services = dict.services as Record<string, string>;
  return services[normalized] ?? services[key] ?? key;
}

export function formatServiceEntry(value: string, dict: Dictionary): string {
  const { key, status } = parseServiceEntry(value);
  const normalized = normalizeServiceKey(key);
  const label = getServiceLabel(normalized, dict);
  if (!status) return label;

  const statusLabel =
    status === "replace"
      ? dict.service.statusReplace
      : dict.service.statusInspect;

  return `${label} · ${statusLabel}`;
}

export function formatCost(amount: number, locale: Locale): string {
  if (locale === "fa") {
    return `${amount.toLocaleString("fa-IR")} تومان`;
  }
  return `$${amount.toFixed(2)}`;
}
