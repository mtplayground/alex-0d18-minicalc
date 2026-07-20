import { expect, test } from '@playwright/test';

test('loads the calculator card display', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('region', { name: 'Calculator' })).toBeVisible();
  await expect(page.getByLabel('Calculator display', { exact: true })).toHaveText(
    '0',
  );
  await expect(
    page.getByText('Vite, React, and Tailwind are ready.'),
  ).toHaveCount(0);
});
