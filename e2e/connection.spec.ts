import { test, expect } from "@playwright/test"

test("Visit Subscape", async ({ page }) => {
  await page.goto("https://app.taho.xyz/")
  await expect(page).toHaveTitle("Subscape")
  await page.getByText("Connect wallet").nth(1).click()
})
