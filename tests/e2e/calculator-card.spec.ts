import { expect, test } from '@playwright/test';

test('loads the calculator card display and keypad', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('region', { name: 'Calculator' })).toBeVisible();
  await expect(page.getByLabel('Calculator display', { exact: true })).toHaveText(
    '0',
  );
  await expect(
    page.getByRole('group', { name: 'Calculator keypad' }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: '7' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Equals' })).toBeVisible();
  await expect(
    page.getByText('Vite, React, and Tailwind are ready.'),
  ).toHaveCount(0);
});
