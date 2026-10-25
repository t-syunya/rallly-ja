import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getLocale } from "@/i18n/server/get-locale";
import { LOCALE_COOKIE_NAME } from "@/lib/locale/constants";
import { getLocaleFromRequest } from "./server";

const { cookieStore } = vi.hoisted(() => ({ cookieStore: new Map() }));
vi.mock("next/headers", () => ({ cookies: async () => cookieStore }));

beforeEach(() => cookieStore.clear());

describe("app locale", () => {
  it.each([
    undefined,
    "ja-JP",
    "en-US",
    "de",
    "mt",
  ])("defaults to Japanese regardless of Accept-Language (%s)", async (language) => {
    const req = new NextRequest("http://localhost/new", {
      headers: language ? { "accept-language": language } : {},
    });
    expect(getLocaleFromRequest(req)).toBe("ja");
    expect(await getLocale()).toBe("ja");
  });

  it.each([
    "ja",
    "en",
    "de",
  ])("respects a selected language (%s)", async (locale) => {
    const req = new NextRequest("http://localhost/new", {
      headers: { cookie: `${LOCALE_COOKIE_NAME}=${locale}` },
    });
    cookieStore.set(LOCALE_COOKIE_NAME, { value: locale });
    expect(getLocaleFromRequest(req)).toBe(locale);
    expect(await getLocale()).toBe(locale);
  });

  it("ignores an unsupported language cookie", async () => {
    const req = new NextRequest("http://localhost/new", {
      headers: { cookie: `${LOCALE_COOKIE_NAME}=invalid` },
    });
    cookieStore.set(LOCALE_COOKIE_NAME, { value: "invalid" });
    expect(getLocaleFromRequest(req)).toBe("ja");
    expect(await getLocale()).toBe("ja");
  });
});
