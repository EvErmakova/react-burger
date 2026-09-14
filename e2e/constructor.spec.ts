import { expect, test } from '@playwright/test';

import { BUN, MAIN, ORDER_NUMBER, SAUCE } from './fixtures';
import {
  dragToConstructor,
  mockAuthorizedUser,
  mockCreateOrder,
  mockIngredients,
} from './helpers';

test.describe('Constructor page', () => {
  test.beforeEach(async ({ page }) => {
    await mockIngredients(page);
    await mockAuthorizedUser(page);
    await mockCreateOrder(page);
    await page.goto('./');
    await expect(page.getByRole('heading', { name: 'Соберите бургер' })).toBeVisible();
  });

  test('drags a bun into the constructor', async ({ page }) => {
    const bunTop = page.getByTestId('constructor-bun-top');
    const bunBottom = page.getByTestId('constructor-bun-bottom');

    await expect(bunTop).toContainText('Выберите булки');

    await dragToConstructor(page, page.getByTestId(`ingredient-${BUN._id}`));

    await expect(bunTop).toContainText(`${BUN.name} (верх)`);
    await expect(bunBottom).toContainText(`${BUN.name} (низ)`);
  });

  test('drags fillings into the constructor', async ({ page }) => {
    const fillings = page.getByTestId('constructor-fillings');

    await expect(fillings).toContainText('Выберите начинку');

    await dragToConstructor(page, page.getByTestId(`ingredient-${SAUCE._id}`));
    await dragToConstructor(page, page.getByTestId(`ingredient-${MAIN._id}`));

    await expect(fillings).toContainText(SAUCE.name);
    await expect(fillings).toContainText(MAIN.name);
    await expect(fillings).not.toContainText('Выберите начинку');
  });

  test('updates the ingredient counter and the total price', async ({ page }) => {
    const bunCard = page.getByTestId(`ingredient-${BUN._id}`);
    const sauceCard = page.getByTestId(`ingredient-${SAUCE._id}`);

    await dragToConstructor(page, bunCard);
    await dragToConstructor(page, sauceCard);
    await dragToConstructor(page, sauceCard);

    await expect(bunCard).toContainText('2');
    await expect(sauceCard).toContainText('2');

    const total = BUN.price * 2 + SAUCE.price * 2;

    await expect(page.getByTestId('burger-constructor')).toContainText(String(total));
  });

  test('removes a filling from the constructor', async ({ page }) => {
    const fillings = page.getByTestId('constructor-fillings');

    await dragToConstructor(page, page.getByTestId(`ingredient-${SAUCE._id}`));
    await expect(fillings).toContainText(SAUCE.name);

    await fillings.locator('.constructor-element__action').first().click();

    await expect(fillings).toContainText('Выберите начинку');
    await expect(page.getByTestId(`ingredient-${SAUCE._id}`)).not.toContainText('1');
  });

  test.describe('Ingredient modal', () => {
    test('opens on an ingredient click and shows its details', async ({ page }) => {
      await page.getByTestId(`ingredient-${SAUCE._id}`).click();

      const modal = page.getByTestId('modal');

      await expect(modal).toBeVisible();
      await expect(modal).toContainText('Детали ингредиента');
      await expect(modal).toContainText(SAUCE.name);
      await expect(modal).toContainText(String(SAUCE.calories));
      await expect(modal).toContainText(String(SAUCE.proteins));
      await expect(page).toHaveURL(new RegExp(`#/ingredients/${SAUCE._id}$`));
    });

    test('closes on the close button click', async ({ page }) => {
      await page.getByTestId(`ingredient-${SAUCE._id}`).click();
      await expect(page.getByTestId('modal')).toBeVisible();

      await page.getByRole('button', { name: 'Закрыть' }).click();

      await expect(page.getByTestId('modal')).toBeHidden();
      await expect(page).toHaveURL(/\/react-burger\/(#\/)?$/);
    });

    test('closes on the overlay click', async ({ page }) => {
      await page.getByTestId(`ingredient-${SAUCE._id}`).click();
      await expect(page.getByTestId('modal')).toBeVisible();

      await page.getByTestId('modal-overlay').click({ position: { x: 5, y: 5 } });

      await expect(page.getByTestId('modal')).toBeHidden();
    });

    test('closes on Escape', async ({ page }) => {
      await page.getByTestId(`ingredient-${SAUCE._id}`).click();
      await expect(page.getByTestId('modal')).toBeVisible();

      await page.keyboard.press('Escape');

      await expect(page.getByTestId('modal')).toBeHidden();
    });
  });

  test('assembles a burger and places an order', async ({ page }) => {
    const orderButton = page.getByRole('button', { name: 'Оформить заказ' });

    await expect(orderButton).toBeDisabled();

    await dragToConstructor(page, page.getByTestId(`ingredient-${BUN._id}`));
    await dragToConstructor(page, page.getByTestId(`ingredient-${SAUCE._id}`));
    await dragToConstructor(page, page.getByTestId(`ingredient-${MAIN._id}`));

    await expect(orderButton).toBeEnabled();

    const orderRequest = page.waitForRequest(
      (request) => request.url().endsWith('/api/orders') && request.method() === 'POST'
    );

    await orderButton.click();

    const request = await orderRequest;

    expect(request.postDataJSON()).toEqual({
      ingredients: [BUN._id, SAUCE._id, MAIN._id, BUN._id],
    });

    const modal = page.getByTestId('modal');

    await expect(modal).toBeVisible();
    await expect(page.getByTestId('order-number')).toHaveText(String(ORDER_NUMBER));
    await expect(modal).toContainText('идентификатор заказа');
    await expect(modal).toContainText('Ваш заказ начали готовить');

    await page.getByRole('button', { name: 'Закрыть' }).click();

    await expect(modal).toBeHidden();
    await expect(page.getByTestId('constructor-bun-top')).toContainText(
      'Выберите булки'
    );
    await expect(page.getByTestId('constructor-fillings')).toContainText(
      'Выберите начинку'
    );
    await expect(orderButton).toBeDisabled();
  });
});

test.describe('Constructor page without authentication', () => {
  test('redirects to the login page instead of placing an order', async ({ page }) => {
    await mockIngredients(page);
    await page.goto('./');

    await dragToConstructor(page, page.getByTestId(`ingredient-${BUN._id}`));
    await dragToConstructor(page, page.getByTestId(`ingredient-${SAUCE._id}`));

    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    await expect(page).toHaveURL(/#\/login$/);
    await expect(page.getByTestId('modal')).toBeHidden();
  });
});
