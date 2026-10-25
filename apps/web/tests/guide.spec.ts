import { expect, test } from "@playwright/test";

for (const width of [1280, 320]) {
  test(`opens the Japanese guide without signing in at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 850 });
    await page.goto("/new");
    await page
      .getByRole("link", { name: "Japanese usage guide", exact: true })
      .click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "使い方ガイド",
    );
    await expect(page.locator("#main-content")).toHaveAttribute("lang", "ja");
    await page
      .getByRole("navigation", { name: "ガイドの目次" })
      .getByRole("link", { name: "参加者の操作" })
      .click();
    await expect(page).toHaveURL(/\/guide#participant$/);
    await expect(
      page.getByRole("table", { name: "回答の見方（例）" }),
    ).toBeVisible();
    await page
      .getByText("メールアドレスが必須と表示される", { exact: true })
      .click();
    await expect(
      page.getByText("主催者がメール必須を設定しています。", { exact: false }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page
      .getByRole("link", { name: "日程調整を作成する", exact: true })
      .click();
    await expect(page).toHaveURL(/\/new$/);
  });
}
