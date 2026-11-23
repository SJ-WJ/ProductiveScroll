import { test, expect, type Page } from "@playwright/test";
import { mockSupabase, TEST_PASSWORD } from "./mockSupabase";

async function submit(page: Page, email: string, password: string) {
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.locator("button[type=submit]").click();
}

test.beforeEach(async ({ page }) => {
  await mockSupabase(page);
});

test("logged-out visitors are sent to sign up", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("/login");
  await expect(page.getByRole("heading", { name: "Create your account" })).toBeVisible();
});

test("signing up opens the app", async ({ page }) => {
  await page.goto("/login");
  await submit(page, "tester@example.com", TEST_PASSWORD);
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();
});

test("a wrong password shows an error and stays on the page", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Log in" }).click();
  await submit(page, "tester@example.com", "wrong-password");
  await expect(page.getByRole("alert")).toContainText("Incorrect email or password");
  await expect(page).toHaveURL("/login");
});

test("logging in keeps you logged in after a reload", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Log in" }).click();
  await submit(page, "tester@example.com", TEST_PASSWORD);
  await expect(page).toHaveURL("/");
  await page.reload();
  await expect(page).toHaveURL("/");
});

test("logging out returns to sign up", async ({ page }) => {
  await page.goto("/login");
  await submit(page, "tester@example.com", TEST_PASSWORD);
  await page.getByRole("button", { name: "Log out" }).click();
  await expect(page).toHaveURL("/login");
});