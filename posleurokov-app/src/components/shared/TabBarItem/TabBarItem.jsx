import React from 'react';
import styles from './TabBarItem.module.scss';

const TabBarItem = ({ content, ...rest }) => {
  return (
    <div
      className={styles.tabBarItem}
      style={{ ...rest }}
    >
      {content}
    </div>
  );
};

export { TabBarItem };
