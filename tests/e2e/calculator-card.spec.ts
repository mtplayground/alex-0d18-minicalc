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

test('accepts keyboard entry on page load and shows pressed feedback', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page.getByLabel('Calculator display', { exact: true })).toHaveText(
    '0',
  );

  const seven = page.getByRole('button', { name: '7' });

  await page.keyboard.down('7');
  await expect(seven).toHaveAttribute('data-key-pressed', 'true');
  await page.keyboard.up('7');
  await expect(seven).not.toHaveAttribute('data-key-pressed', 'true');

  await page.keyboard.press('-');
  await page.keyboard.press('5');
  await page.keyboard.press('Enter');

  await expect(page.getByLabel('Calculator display', { exact: true })).toHaveText(
    '2',
  );

  await page.keyboard.press('Delete');

  await expect(page.getByLabel('Calculator display', { exact: true })).toHaveText(
    '0',
  );
});
