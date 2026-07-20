import { expect, type Page, test } from '@playwright/test';

const display = (page: Page) =>
  page.getByLabel('Calculator display', { exact: true });

async function clickButton(page: Page, name: string) {
  await page.getByRole('button', { name }).click();
}

test.describe('core calculation flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(display(page)).toHaveText('0');
  });

  test('performs a calculation by clicking buttons', async ({ page }) => {
    await clickButton(page, '1');
    await clickButton(page, '2');
    await clickButton(page, 'Subtract');
    await clickButton(page, '5');
    await clickButton(page, 'Equals');

    await expect(display(page)).toHaveText('7');
  });

  test('performs the same calculation from the keyboard', async ({ page }) => {
    await page.keyboard.press('1');
    await page.keyboard.press('2');
    await page.keyboard.press('-');
    await page.keyboard.press('5');
    await page.keyboard.press('Enter');

    await expect(display(page)).toHaveText('7');
  });

  test('clears entered state and resets the display', async ({ page }) => {
    await clickButton(page, '9');
    await clickButton(page, 'Decimal point');
    await clickButton(page, '5');

    await expect(display(page)).toHaveText('9.5');

    await clickButton(page, 'Clear');

    await expect(display(page)).toHaveText('0');

    await page.keyboard.press('8');
    await expect(display(page)).toHaveText('8');

    await page.keyboard.press('Delete');
    await expect(display(page)).toHaveText('0');
  });

  test('shows divide-by-zero as a readable error display', async ({ page }) => {
    await clickButton(page, '8');
    await clickButton(page, 'Divide');
    await clickButton(page, '0');
    await clickButton(page, 'Equals');

    await expect(display(page)).toHaveText('Cannot divide by zero');
  });
});
