import uz from "./uz.json";
import ru from "./ru.json";
import en from "./en.json";

export const locales = ["uz", "en", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uz";

const dictionaries: Record<Locale, Record<string, unknown>> = { uz, ru, en };

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** Dot-path translation lookup: t("hero.text-1") */
export function useTranslations(locale: Locale) {
  const dict = dictionaries[locale];
  return function t(key: string): string {
    const value = key
      .split(".")
      .reduce<unknown>(
        (node, part) =>
          node && typeof node === "object"
            ? (node as Record<string, unknown>)[part]
            : undefined,
        dict
      );
    return typeof value === "string" ? value : key;
  };
}

export function localePath(locale: Locale, path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const withSlash = clean.endsWith("/") ? clean : `${clean}/`;
  return `/${locale}${withSlash}`;
}

/** Swap the locale prefix of the current pathname (for the language switcher). */
export function switchLocalePath(pathname: string, to: Locale) {
  const stripped = pathname.replace(/^\/(uz|en|ru)(?=\/|$)/, "");
  return `/${to}${stripped || "/"}`;
}

export const localeLabels: Record<Locale, string> = {
  uz: "O'zbekcha",
  ru: "Русский",
  en: "English",
};

export function getStaticLocalePaths() {
  return locales.map((locale) => ({ params: { locale } }));
}
