import { expect, test } from '@playwright/test';

test('loads the MiniCalc placeholder page', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      name: 'Vite, React, and Tailwind are ready.',
    }),
  ).toBeVisible();
  await expect(page.getByText('MiniCalc', { exact: true })).toBeVisible();
});
