import { expect, test } from "@playwright/test";

for (const width of [1280, 390]) {
  test(`source links are reachable on the create page at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 720 });
    await page.goto("/new");

    for (const name of ["Rallly 日本語版 — Source code", "AGPLv3+"]) {
      const link = page.getByRole("link", { name, exact: true });
      await link.click({ trial: true });
      await expect(link).toBeInViewport();
    }
  });
}
