import { expect, test } from "@playwright/test";

test("shows Japanese by default and switches languages without nesting prefixes", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "ja");
  await expect(page.getByText(/^\d{4}年\d{1,2}月$/).first()).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "みんなの都合が合う日時を見つけよう" }),
  ).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /:\d+\/?$/,
  );
  await page.getByRole("combobox", { name: "言語", exact: true }).click();
  await page.getByRole("option", { name: "English", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/?$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(
    page.getByRole("heading", {
      name: "Find the best time to meet",
      exact: true,
    }),
  ).toBeVisible();
  await page.getByRole("combobox", { name: "Language", exact: true }).click();
  await page.getByRole("option", { name: "Deutsch", exact: true }).click();
  await expect(page).toHaveURL(/\/de\/?$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: "日本語", exact: true }).click();
  await expect(page).toHaveURL(/:\d+\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "ja");
  expect(errors).toEqual([]);
});

test("shows Japanese pricing and keeps localized navigation", async ({
  page,
}) => {
  await page.goto("/ja/pricing?ref=test");
  await expect(page).toHaveURL(/\/pricing\?ref=test$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "ja");
  await expect(
    page.getByRole("heading", { name: "プランを比較", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "ブログ", exact: true }).first(),
  ).toHaveAttribute("href", "/blog");
  await expect(
    page.locator('link[rel="alternate"][hreflang="en"]'),
  ).toHaveAttribute("href", /\/en\/pricing$/);
});

test("formats blog dates in Japanese", async ({ page }) => {
  await page.goto("/blog");
  await expect(
    page.getByRole("heading", { name: "ブログ", exact: true }),
  ).toBeVisible();
  await expect(page.locator("time").first()).toContainText(/\d+年\d+月\d+日/);
});

test("shows the root 404 in Japanese", async ({ page }) => {
  const response = await page.goto("/missing.txt");
  expect(response?.status()).toBe(404);
  await expect(page.locator("html")).toHaveAttribute("lang", "ja");
  await expect(
    page.getByText("404 ページが見つかりません", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "ホームへ移動", exact: true }),
  ).toHaveAttribute("href", "/");
});
