"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { Input, Select } from "@/components/ui/input";
import {
  PERSIAN_MONTHS,
  formatJalaliDate,
  formatPersianDigits,
  getJalaliYearRange,
  getTodayGregorianIso,
  getTodayJalali,
  gregorianIsoToJalali,
  jalaaliMonthLength,
  jalaliToGregorianIso,
} from "@/lib/jalali";

type DateInputProps = {
  label: string;
  name?: string;
  defaultValue?: string;
  required?: boolean;
};

function JalaliDateInput({
  label,
  name = "date",
  defaultValue,
  required,
}: DateInputProps) {
  const initial = defaultValue
    ? gregorianIsoToJalali(defaultValue)
    : getTodayJalali();

  const [jy, setJy] = useState(initial.jy);
  const [jm, setJm] = useState(initial.jm);
  const [jd, setJd] = useState(initial.jd);

  const daysInMonth = jalaaliMonthLength(jy, jm);
  const iso = jalaliToGregorianIso(jy, jm, Math.min(jd, daysInMonth));

  useEffect(() => {
    if (jd > daysInMonth) {
      setJd(daysInMonth);
    }
  }, [jd, daysInMonth]);

  const years = useMemo(() => getJalaliYearRange(), []);
  const preview = formatJalaliDate(iso, "long");

  return (
    <div className="space-y-1.5">
      <p className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </p>
      <div className="grid grid-cols-3 gap-2">
        <Select
          label="روز"
          value={String(Math.min(jd, daysInMonth))}
          onChange={(e) => setJd(Number(e.target.value))}
          options={Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            return {
              value: String(day),
              label: formatPersianDigits(day),
            };
          })}
        />
        <Select
          label="ماه"
          value={String(jm)}
          onChange={(e) => setJm(Number(e.target.value))}
          options={PERSIAN_MONTHS.map((month, index) => ({
            value: String(index + 1),
            label: month,
          }))}
        />
        <Select
          label="سال"
          value={String(jy)}
          onChange={(e) => setJy(Number(e.target.value))}
          options={years.map((year) => ({
            value: String(year),
            label: formatPersianDigits(year),
          }))}
        />
      </div>
      <input type="hidden" name={name} value={iso} required={required} />
      <p className="text-xs text-zinc-500 dark:text-zinc-400">{preview}</p>
    </div>
  );
}

export function DateInput(props: DateInputProps) {
  const { locale } = useLocale();

  if (locale === "en") {
    return (
      <Input
        label={props.label}
        name={props.name ?? "date"}
        type="date"
        defaultValue={props.defaultValue ?? getTodayGregorianIso()}
        required={props.required}
      />
    );
  }

  return <JalaliDateInput {...props} />;
}
