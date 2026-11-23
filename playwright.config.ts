import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  testMatch: "*.e2e.ts",
  use: {baseURL: "http://localhost:4173"},
  webServer: {
    command: "npm run build && npm run preview -- --port 4173",
    url: "http:localhost:4173",
    reuseExistingServer: !process.env.CI,
    env: {
      VITE_SUPABASE_URL: "https://test-project.supabase.co",
      VITE_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_test",
    },
  },
});