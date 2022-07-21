import React from 'react';
import styles from './TabsBar.module.scss';
import TabBarNav from '../TabBarNav/TabBarNav';

const TabsBar = ({ label, children, ...rest }) => {
  return (
    <div
      className={styles.tabs}
      style={{ ...rest }}
    >
      <div className={styles.tabsBarNav}>
        <TabBarNav
          label={label}
        />
      </div>
      <div className={styles.tabItem}>
        {children}
      </div>
    </div>
  );
};

export { TabsBar };
