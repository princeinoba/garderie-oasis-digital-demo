import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("public journey and language switch", async ({ page }, testInfo) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Visit, discover");
  if (testInfo.project.name === "mobile") {
    await page.locator('button[aria-controls="mobile-navigation"]').click();
    const mobileNavigation = page.getByRole("navigation", { name: "Mobile navigation" });
    await mobileNavigation.getByRole("button", { name: /passer au/i }).click();
    await expect(mobileNavigation.getByRole("link", { name: /programmes/i }).first()).toBeVisible();
  } else {
    await page.getByRole("button", { name: /passer au|switch to english/i }).click();
    await expect(page.getByRole("link", { name: /programmes/i }).first()).toBeVisible();
  }
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
});

test("Oasis Guide refuses availability claims", async ({ page }) => {
  await page.goto("/faq");
  await page.getByRole("button", { name: /spaces available/i }).click();
  await expect(page.locator(".guide-refusal")).toContainText(/can.t assess availability/i);
});

test("director routes require sign-in and expose synthetic workflows", async ({ page }) => {
  await page.goto("/director");
  await expect(page).toHaveURL(/sign-in/);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL(/director$/);
  await page.getByRole("link", { name: /Tour Inquiries/i }).click();
  await page.getByRole("link", { name: /Sophie Martin/i }).click();
  await expect(page).toHaveURL(/tour-inquiries\/5ec1f519-078c-4bb4-b7a2-2a62a1b0a001$/);
  await expect(page.getByRole("heading", { name: "Childcare Needs" })).toBeVisible();
  await page.getByRole("button", { name: "Approve draft" }).click();
  await expect(page.getByText("approved", { exact: true })).toBeVisible();
});

test("@a11y public home has no serious axe violations", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
    .analyze();
  expect(
    results.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? ""),
    ),
  ).toEqual([]);
});
