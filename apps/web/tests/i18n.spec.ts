import test, { expect } from "@playwright/test";

test("should show correct language if supported", async ({ browser }) => {
  const context = await browser.newContext({
    locale: "en",
    storageState: { cookies: [], origins: [] },
  });
  await context.addCookies([
    { name: "rallly_locale", value: "de", domain: "localhost", path: "/" },
  ]);
  const page = await context.newPage();
  // Locale-sensitive Intl formatting must not differ between the server and
  // the browser — a mismatch makes React throw away the server HTML.
  const hydrationErrors: string[] = [];
  page.on("pageerror", (error) => {
    if (error.message.includes("Hydration failed")) {
      hydrationErrors.push(error.message);
    }
  });
  await page.goto("/new");
  await expect(page.locator("text=Titel")).toBeVisible();
  // A pill only reacts to clicks once hydration is done, so a successful
  // selection proves the page hydrated before we assert on errors.
  await page.getByTestId("all-day-option").click();
  await expect(page.getByTestId("all-day-option")).toHaveAttribute(
    "data-checked",
    "",
  );
  expect(hydrationErrors).toEqual([]);
  await context.close();
});

for (const locale of ["ja-JP", "en-US", "mt"]) {
  test(`should default to Japanese for a ${locale} browser`, async ({
    browser,
  }) => {
    const context = await browser.newContext({
      locale,
      storageState: { cookies: [], origins: [] },
    });
    const page = await context.newPage();
    await page.goto("/new");
    await expect(page.getByLabel("タイトル", { exact: true })).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "ja");
    await page.getByTestId("all-day-option").click();
    await expect(page.getByTestId("all-day-option")).toHaveAttribute(
      "data-checked",
      "",
    );
    await page.getByRole("button", { name: "15", exact: true }).click();
    await expect(
      page.getByText("1件の日付を選択中", { exact: true }),
    ).toBeVisible();
    await page.reload();
    await expect(page.getByLabel("タイトル", { exact: true })).toBeVisible();
    await context.close();
  });
}

test("shows Japanese login and week calendar", async ({ browser }) => {
  const context = await browser.newContext({
    locale: "en-US",
    storageState: { cookies: [], origins: [] },
  });
  const page = await context.newPage();
  const hydrationErrors: string[] = [];
  page.on("pageerror", (error) => hydrationErrors.push(error.message));
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: "ようこそ" })).toBeVisible();
  await expect(page.getByPlaceholder("taro.yamada@example.com")).toBeVisible();
  await page.goto("/new");
  await page.getByRole("tab", { name: "週表示" }).click();
  const headers = page.locator('[data-slot="event-calendar-day-header"]');
  await expect(headers).toHaveCount(7);
  await expect(headers.first()).toContainText("日");
  expect(hydrationErrors).toEqual([]);
  await context.close();
});
