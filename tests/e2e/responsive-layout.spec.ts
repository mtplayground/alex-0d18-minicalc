import { expect, type Page, test } from '@playwright/test';

const viewports = [
  { name: 'phone', width: 360, height: 740 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
] as const;

async function assertCalculatorFits(page: Page, viewportWidth: number) {
  const card = page.getByRole('region', { name: 'Calculator' });
  const display = page.getByLabel('Calculator display', { exact: true });
  const button = page.getByRole('button', { name: '7' });

  await expect(card).toBeVisible();
  await expect(display).toBeVisible();
  await expect(button).toBeVisible();

  const cardBox = await card.boundingBox();
  const displayBox = await display.boundingBox();
  const buttonBox = await button.boundingBox();

  expect(cardBox).not.toBeNull();
  expect(displayBox).not.toBeNull();
  expect(buttonBox).not.toBeNull();

  expect(cardBox!.width).toBeLessThanOrEqual(viewportWidth - 24);
  expect(displayBox!.width).toBeLessThanOrEqual(cardBox!.width);
  expect(buttonBox!.height).toBeGreaterThanOrEqual(48);
  expect(buttonBox!.width).toBeGreaterThanOrEqual(48);
}

for (const viewport of viewports) {
  test(`calculator layout fits at ${viewport.name} width`, async ({ page }) => {
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    });
    await page.goto('/');

    await assertCalculatorFits(page, viewport.width);
  });
}

test('display handles very long keyboard input without escaping the card', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto('/');

  await expect(page.getByLabel('Calculator display', { exact: true })).toHaveText(
    '0',
  );

  for (let index = 0; index < 30; index += 1) {
    await page.keyboard.press('9');
  }

  const cardBox = await page
    .getByRole('region', { name: 'Calculator' })
    .boundingBox();
  const display = page.getByLabel('Calculator display', { exact: true });
  const displayBox = await display.boundingBox();

  await expect(display).toHaveText('999999999999999999999999999999');
  await expect(display).toHaveCSS('white-space', 'nowrap');
  expect(cardBox).not.toBeNull();
  expect(displayBox).not.toBeNull();
  expect(displayBox!.width).toBeLessThanOrEqual(cardBox!.width);
});
