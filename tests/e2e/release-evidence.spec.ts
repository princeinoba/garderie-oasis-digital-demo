import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("keyboard skip link and mobile navigation are operable", async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium",
    "Keyboard traversal is captured once in Chromium.",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  });
  const skipLink = page.getByRole("link", { name: /skip to main content/i });
  await page.keyboard.press("Tab");
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);

  const menuButton = page.locator('button[aria-controls="mobile-navigation"]');
  await menuButton.focus();
  await page.keyboard.press("Enter");
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  const firstMobileLink = page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link")
    .first();
  await expect(firstMobileLink).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(firstMobileLink).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
});

test("@a11y tour and director surfaces have no serious axe violations", async ({ page }) => {
  for (const route of ["/tours-and-registration", "/privacy", "/accessibility"]) {
    await page.goto(route);
    await page.waitForLoadState("networkidle");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
      .analyze();
    expect(
      results.violations.filter((violation) =>
        ["serious", "critical"].includes(violation.impact ?? ""),
      ),
    ).toEqual([]);
  }

  await page.goto("/sign-in");
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL(/director$/);
  const directorResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
    .analyze();
  expect(
    directorResults.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? ""),
    ),
  ).toEqual([]);
});

test("capture responsive release evidence", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Captured once with desktop Chromium.");
  const outputDir = resolve("docs", "release-assets");
  await mkdir(outputDir, { recursive: true });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.screenshot({ path: resolve(outputDir, "home-1440.png"), fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.screenshot({ path: resolve(outputDir, "home-390.png"), fullPage: true });
  await page.goto("/tours-and-registration");
  await page.screenshot({ path: resolve(outputDir, "tour-390.png"), fullPage: true });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/sign-in");
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL(/director$/);
  await page.screenshot({ path: resolve(outputDir, "director-1440.png"), fullPage: true });
});
