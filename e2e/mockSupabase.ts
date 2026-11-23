import type { Page } from "@playwright/test";

export const TEST_PASSWORD = "test-password-1";

const user = {
  id: "00000000-0000-0000-0000-000000000001",
  aud: "authenticated",
  role: "authenticated",
  email: "tester@example.com",
  app_metadata: {},
  user_metadata: {},
  created_at: "2026-01-01T00:00:00Z",
};

const session = () => ({
  access_token: "test-token",
  token_type: "bearer",
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  refresh_token: "test-refresh",
  user,
});

export async function mockSupabase(page: Page) {
  await page.route("**/auth/v1/**", (route) => {
    const url = route.request().url();

    if (url.includes("grant_type=password")) {
      const { password } = route.request().postDataJSON();
      return password === TEST_PASSWORD
        ? route.fulfill({ json: session() })
        : route.fulfill({ status: 400, json: { code: "invalid_credentials", msg: "Invalid login credentials" } });
    }
    if (url.includes("/signup")) return route.fulfill({ json: session() });
    if (url.includes("/logout")) return route.fulfill({ status: 204 });
    if (url.includes("/user")) return route.fulfill({ json: user });
    return route.fulfill({ status: 404, json: {} });
  });
}