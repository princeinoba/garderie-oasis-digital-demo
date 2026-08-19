import { expect, test } from "@playwright/test";

test("tour preview validates, reviews, and confirms without delivery", async ({ page }) => {
  await page.goto("/tours-and-registration");
  await page.waitForLoadState("networkidle");
  await expect(page.locator(".tour-form-card")).toHaveAttribute("data-hydrated", "true", {
    timeout: 15_000,
  });
  await page.getByLabel(/last name/i).fill("Johnson");
  await page.getByLabel("Email address").fill("alex.johnson@synthetic.invalid");
  await page.getByLabel(/Telephone number/i).fill("613-555-0123");
  await page.getByLabel(/first name/i).fill("Alex");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByLabel(/Child age group/i)).toBeVisible();
  await page.getByLabel(/Child age group/i).selectOption("toddler");
  await page.getByLabel(/Program of interest/i).selectOption("toddler");
  await page.getByLabel(/Desired start month/i).fill("2026-10");
  await page.getByLabel(/Care schedule/i).selectOption("full_time");
  await page.getByLabel(/Preferred tour date/i).fill("2026-08-28");
  await page.getByLabel(/Preferred tour time/i).selectOption("morning");
  await page.getByRole("button", { name: "Continue" }).click();
  for (const box of await page.getByRole("checkbox").all()) await box.check();
  await page.getByRole("button", { name: /Create Demonstration Preview/i }).click();
  await expect(page.getByRole("heading", { name: /Thank you/i })).toBeFocused();
  await expect(page.getByText(/No real tour request was saved or delivered/i)).toBeVisible();
});

test("required viewports have no horizontal page overflow", async ({ page }) => {
  for (const viewport of [
    { width: 320, height: 720 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
      ),
    ).toBe(true);
  }
});
