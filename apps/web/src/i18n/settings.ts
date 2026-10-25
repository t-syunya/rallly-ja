import allLanguages from "@rallly/languages";
import type { InitOptions, Namespace } from "i18next";

export const fallbackLng = "en";
export const languageNames = allLanguages;
export const languages = Object.keys(languageNames);
export const defaultNS = "app";

export function getOptions(
  lng = fallbackLng,
  ns: Namespace = defaultNS,
): InitOptions {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
