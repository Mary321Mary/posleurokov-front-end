import React from 'react';
import styles from './TabBarNav.module.scss';

const TabBarNav = ({ children, dataIndex, activeTab, onClick, ...rest }) => {
  return (
    <button
      type='button'
      className={`${styles.tabbutton} ${
        dataIndex == activeTab ? styles['tabbutton--active'] : ''
      }`}
      onClick={onClick}
      data-index={dataIndex}
      style={{ ...rest }}
    >
      {children}
    </button>
  );
};

export { TabBarNav };
