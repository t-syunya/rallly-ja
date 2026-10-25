import { defineConfig, devices } from "@playwright/test";

const port = process.env.PORT || "3003";
const baseURL = `http://localhost:${port}`;

export default defineConfig({
  testDir: "./tests",
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  use: { baseURL, locale: "en-US", trace: "retain-on-failure" },
  webServer: {
    command: `next start --port ${port}`,
    url: baseURL,
    reuseExistingServer: process.env.CI !== "true",
  },
  reporter: "list",
});
