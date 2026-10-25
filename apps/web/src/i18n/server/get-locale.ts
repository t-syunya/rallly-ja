import { cookies } from "next/headers";
import { languages as supportedLngs } from "@/i18n/settings";
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME } from "@/lib/locale/constants";

export async function getLocale() {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  if (cookieLocale && supportedLngs.includes(cookieLocale)) {
    return cookieLocale;
  }

  return DEFAULT_LOCALE;
}
