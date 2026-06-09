import { Tab } from '@krgaa/react-developer-burger-ui-components';

import { INGREDIENT_TABS } from '../../constants';

import styles from './tabs.module.css';

export const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <nav>
      <ul className={styles.tabs}>
        {INGREDIENT_TABS.map((tab) => (
          <li key={tab.value}>
            <Tab
              value={tab.value}
              active={tab.value === activeTab}
              onClick={() => {
                onTabChange(tab.value);
              }}
            >
              {tab.title}
            </Tab>
          </li>
        ))}
      </ul>
    </nav>
  );
};
