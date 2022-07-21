import React from 'react';
import styles from './TabBarNav.module.scss';

const TabBarNav = ({ label, ...rest }) => {
  return (
    <button
      type='button'
      className={styles.tabBarNav}
      style={{ ...rest }}
      onClick={() => { alert(1); }}
    >
      {label}
    </button>
  );
};

export { TabBarNav };
