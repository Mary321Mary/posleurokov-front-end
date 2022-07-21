import React from 'react';
import styles from './TabBarItem.module.scss';

const TabBarItem = ({ children, ...rest }) => {
  return (
    <div
      className={styles.tabBarItem}
      style={{ ...rest }}
    >
      {children}
    </div>
  );
};

export { TabBarItem };
