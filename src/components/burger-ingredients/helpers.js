import { INGREDIENT_TABS } from './constants';

const getTopOffset = (element, container) =>
  element.getBoundingClientRect().top - container.getBoundingClientRect().top;

export const scrollToHeading = (container, heading) => {
  if (!container || !heading) {
    return;
  }

  container.scrollTo({
    top: container.scrollTop + getTopOffset(heading, container),
    behavior: 'smooth',
  });
};

export const getClosestTab = (container, headings) => {
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
