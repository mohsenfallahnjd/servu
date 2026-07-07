import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/en";
import { fa } from "./dictionaries/fa";
import { en } from "./dictionaries/en";

const dictionaries = { en, fa };

export type { Dictionary };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function t(locale: Locale) {
  return getDictionary(locale);
}
