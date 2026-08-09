import type { TIngredientType } from '@utils/types';

export type TTabsProps = {
  activeTab: TIngredientType;
  onTabChange: (tab: TIngredientType) => void;
};
