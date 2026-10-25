import { supportedLngs } from "@rallly/languages";
import { absoluteUrl } from "@rallly/utils/absolute-url";
import type { Metadata } from "next";
import { defaultLocale } from "@/i18n/settings";

const localizedUrl = (locale: string, path: string) =>
  locale === defaultLocale
    ? absoluteUrl(path)
    : absoluteUrl(`/${locale}${path}`);

export function getAlternateLanguages(path = "/") {
  const languages: Record<string, string> = {
    "x-default": absoluteUrl(path),
  };
  for (const locale of supportedLngs) {
    languages[locale] = localizedUrl(locale, path);
  }
  return languages;
}

export function getAlternates({
  locale,
  path = "/",
}: {
  locale: string;
  path?: string;
}): Metadata["alternates"] {
  return {
    canonical: localizedUrl(locale, path),
    languages: getAlternateLanguages(path),
  };
}
