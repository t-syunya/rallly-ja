import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { defaultLocale, headerName, languages } from "./settings";

function getLocaleFromPath(pathname: string): string | undefined {
  return languages.find(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`),
  );
}

function removeLocaleFromPath(pathname: string, locale: string): string {
  if (pathname === `/${locale}`) return "/";
  if (pathname.startsWith(`/${locale}/`)) {
    return pathname.slice(locale.length + 1);
  }
  return pathname;
}

function addLocaleToPath(pathname: string, locale: string): string {
  return `/${locale}${pathname}`;
}

function createLocalizedHeaders(req: NextRequest, locale: string): Headers {
  const headers = new Headers(req.headers);
  headers.set(headerName, locale);
  return headers;
}

export function i18nMiddleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const newUrl = req.nextUrl.clone();

  const localeInPath = getLocaleFromPath(pathname);
  const locale = localeInPath || defaultLocale;
  const headers = createLocalizedHeaders(req, locale);

  // Japanese uses the unprefixed URL; explicit paths select other languages.
  if (localeInPath === defaultLocale) {
    newUrl.pathname = removeLocaleFromPath(pathname, defaultLocale);
    return NextResponse.redirect(newUrl);
  }

  if (!localeInPath) {
    newUrl.pathname = addLocaleToPath(pathname, defaultLocale);
    return NextResponse.rewrite(newUrl, { request: { headers } });
  }

  return NextResponse.next({ request: { headers } });
}
