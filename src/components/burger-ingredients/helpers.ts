import { INGREDIENT_TABS } from '@utils/constants';

import type { TIngredientType } from '@utils/types';

import type { THeadingRefs } from './types';

const getTopOffset = (element: HTMLElement, container: HTMLElement): number =>
  element.getBoundingClientRect().top - container.getBoundingClientRect().top;

export const scrollToHeading = (
  container: HTMLElement | null,
  heading: HTMLElement | null | undefined
): void => {
  if (!container || !heading) {
    return;
  }

  container.scrollTo({
    top: container.scrollTop + getTopOffset(heading, container),
    behavior: 'smooth',
  });
};

export const getClosestTab = (
  container: HTMLElement,
  headings: THeadingRefs
): TIngredientType => {
  let closestTab = INGREDIENT_TABS[0].value;
  let minDistance = Infinity;

  for (const { value } of INGREDIENT_TABS) {
    const heading = headings[value];
    if (!heading) {
      continue;
    }

    const distance = Math.abs(getTopOffset(heading, container));
    if (distance < minDistance) {
      minDistance = distance;
      closestTab = value;
    }
  }

  return closestTab;
};
