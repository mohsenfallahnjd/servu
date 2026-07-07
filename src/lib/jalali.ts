import {
  jalaaliMonthLength,
  toGregorian,
  toJalaali,
} from "jalaali-js";

export const PERSIAN_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
] as const;

export type JalaliParts = { jy: number; jm: number; jd: number };

export function getTodayGregorianIso(): string {
  const now = new Date();
  return toGregorianIso(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

export function getTodayJalali(): JalaliParts {
  const now = new Date();
  return toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

export function toGregorianIso(gy: number, gm: number, gd: number): string {
  return `${gy}-${String(gm).padStart(2, "0")}-${String(gd).padStart(2, "0")}`;
}

export function gregorianIsoToJalali(iso: string): JalaliParts {
  const [gy, gm, gd] = iso.split("-").map(Number);
  return toJalaali(gy, gm, gd);
}

export function parseGregorianIsoLocal(iso: string): Date {
  const [gy, gm, gd] = iso.split("-").map(Number);
  return new Date(gy, gm - 1, gd);
}

export function gregorianDateToJalali(date: Date | string): JalaliParts {
  const d =
    typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)
      ? parseGregorianIsoLocal(date)
      : new Date(date);
  return toJalaali(d.getFullYear(), d.getMonth() + 1, d.getDate());
}

export function jalaliToGregorianIso(jy: number, jm: number, jd: number): string {
  const { gy, gm, gd } = toGregorian(jy, jm, jd);
  return toGregorianIso(gy, gm, gd);
}

export function formatPersianDigits(value: number | string): string {
  return String(value).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

export function formatJalaliDate(
  date: Date | string,
  style: "long" | "numeric" = "long",
): string {
  const { jy, jm, jd } = gregorianDateToJalali(date);

  if (style === "numeric") {
    const numeric = `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;
    return formatPersianDigits(numeric);
  }

  return `${formatPersianDigits(jd)} ${PERSIAN_MONTHS[jm - 1]} ${formatPersianDigits(jy)}`;
}

export function getJalaliYearRange(past = 20, future = 1): number[] {
  const current = getTodayJalali().jy;
  const years: number[] = [];
  for (let y = current - past; y <= current + future; y++) {
    years.push(y);
  }
  return years;
}

export { jalaaliMonthLength };
