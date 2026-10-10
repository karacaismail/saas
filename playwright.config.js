import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  timeout: 45000,
  expect: { timeout: 6000 },
  fullyParallel: true,
  workers: 3,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:4173',
    locale: 'tr-TR',
    timezoneId: 'Europe/Istanbul',
    colorScheme: 'light',
    serviceWorkers: 'block',
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'npm run dev',
        url: 'http://127.0.0.1:4173',
        reuseExistingServer: !process.env.CI,
      },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
    {
      name: 'chromium-touch',
      use: {
        browserName: 'chromium',
        hasTouch: true,
        isMobile: true,
        viewport: { width: 390, height: 844 },
      },
      testMatch: '**/atlas.spec.js',
      grep: /coarse and hybrid/,
    },
    {
      name: 'webkit-touch',
      use: {
        browserName: 'webkit',
        hasTouch: true,
        isMobile: true,
        viewport: { width: 390, height: 844 },
      },
      testMatch: '**/atlas.spec.js',
      grep: /coarse and hybrid/,
    },
    {
      name: 'chromium-hybrid',
      use: {
        browserName: 'chromium',
        hasTouch: true,
        isMobile: false,
        viewport: { width: 1280, height: 900 },
      },
      testMatch: '**/atlas.spec.js',
      grep: /coarse and hybrid/,
    },
  ],
});
