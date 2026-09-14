import type { Locator, Page } from '@playwright/test';

export const ACCESS_TOKEN = 'Bearer test-access-token';

const DROP_ZONE_TEST_ID = 'constructor-drop-zone';

export const mockIngredients = async (page: Page): Promise<void> => {
  await page.routeFromHAR('./e2e/har/ingredients.har', {
    url: '**/api/ingredients',
    update: false,
  });
};

export const mockAuthorizedUser = async (page: Page): Promise<void> => {
  await page.addInitScript((token) => {
    window.localStorage.setItem('accessToken', token);
    window.localStorage.setItem('refreshToken', 'test-refresh-token');
  }, ACCESS_TOKEN);

  await page.routeFromHAR('./e2e/har/authorized-user.har', {
    url: '**/api/auth/user',
    update: false,
  });
};

export const mockCreateOrder = async (page: Page): Promise<void> => {
  await page.routeFromHAR('./e2e/har/create-order.har', {
    url: '**/api/orders',
    update: false,
  });
};

export const dragToConstructor = async (page: Page, card: Locator): Promise<void> => {
  await card.waitFor();
  await page.getByTestId(DROP_ZONE_TEST_ID).waitFor();

  await card.evaluate((source, dropZoneTestId) => {
    const target = document.querySelector(`[data-testid="${dropZoneTestId}"]`);

    if (!target) {
      throw new Error('Constructor drop zone is not on the page');
    }

    const dataTransfer = new DataTransfer();
    const fire = (element: Element, type: string): void => {
      element.dispatchEvent(
        new DragEvent(type, { bubbles: true, cancelable: true, dataTransfer })
      );
    };

    fire(source, 'dragstart');
    fire(target, 'dragenter');
    fire(target, 'dragover');
    fire(target, 'drop');
    fire(source, 'dragend');
  }, DROP_ZONE_TEST_ID);
};
