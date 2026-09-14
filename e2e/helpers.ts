import { INGREDIENTS, ORDER_NUMBER, USER } from './fixtures';

import type { Locator, Page } from '@playwright/test';

export const ACCESS_TOKEN = 'Bearer test-access-token';

export const mockIngredients = async (page: Page): Promise<void> => {
  await page.route('**/api/ingredients', (route) =>
    route.fulfill({ json: { success: true, data: INGREDIENTS } })
  );
};

export const mockAuthorizedUser = async (page: Page): Promise<void> => {
  await page.addInitScript((token) => {
    window.localStorage.setItem('accessToken', token);
    window.localStorage.setItem('refreshToken', 'test-refresh-token');
  }, ACCESS_TOKEN);

  await page.route('**/api/auth/user', (route) =>
    route.fulfill({ json: { success: true, user: USER } })
  );
};

export const mockCreateOrder = async (page: Page): Promise<void> => {
  await page.route('**/api/orders', (route) =>
    route.fulfill({
      json: {
        success: true,
        name: 'Космический бургер',
        order: { number: ORDER_NUMBER },
      },
    })
  );
};

export const dragToConstructor = async (page: Page, card: Locator): Promise<void> => {
  const dropZone = page.getByTestId('constructor-drop-zone');

  await card.hover();
  await page.mouse.down();

  const box = await dropZone.boundingBox();

  if (!box) {
    throw new Error('Constructor drop zone is not on the page');
  }

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 });
  await page.mouse.up();
};
