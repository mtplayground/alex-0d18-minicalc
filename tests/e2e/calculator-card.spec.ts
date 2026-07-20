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

test('updates the display from button presses and clears errors', async ({
  page,
}) => {
  await page.goto('/');

  await page.getByRole('button', { name: '8' }).click();
  await page.getByRole('button', { name: 'Divide' }).click();
  await page.getByRole('button', { name: '0' }).click();
  await page.getByRole('button', { name: 'Equals' }).click();

  await expect(page.getByLabel('Calculator display', { exact: true })).toHaveText(
    'Cannot divide by zero',
  );

  await page.getByRole('button', { name: 'Clear' }).click();

  await expect(page.getByLabel('Calculator display', { exact: true })).toHaveText(
    '0',
  );
});
