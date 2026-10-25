import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { i18nMiddleware } from "./middleware";

describe("landing locale routing", () => {
  it.each([
    "ja-JP",
    "en-US",
    "de",
  ])("serves Japanese at the unprefixed URL for a %s browser", (language) => {
    const response = i18nMiddleware(
      new NextRequest("http://localhost/pricing?ref=test", {
        headers: { "accept-language": language },
      }),
    );
    expect(response.headers.get("x-middleware-rewrite")).toBe(
      "http://localhost/ja/pricing?ref=test",
    );
    expect(
      response.headers.get("x-middleware-request-x-i18next-current-language"),
    ).toBe("ja");
  });

  it.each(["en", "de", "en-GB"])("preserves an explicit %s path", (locale) => {
    const response = i18nMiddleware(
      new NextRequest(`http://localhost/${locale}/pricing`),
    );
    expect(response.headers.get("location")).toBeNull();
    expect(response.headers.get("x-middleware-rewrite")).toBeNull();
    expect(
      response.headers.get("x-middleware-request-x-i18next-current-language"),
    ).toBe(locale);
  });

  it.each([
    ["/ja", "/"],
    ["/ja/pricing?ref=test", "/pricing?ref=test"],
  ])("canonicalizes %s without losing the query", (from, to) => {
    const response = i18nMiddleware(new NextRequest(`http://localhost${from}`));
    expect(response.headers.get("location")).toBe(`http://localhost${to}`);
  });

  it("does not treat a partial language prefix as a locale", () => {
    const response = i18nMiddleware(new NextRequest("http://localhost/japan"));
    expect(response.headers.get("x-middleware-rewrite")).toBe(
      "http://localhost/ja/japan",
    );
  });
});
