import React from 'react';
import styles from './TabBarNav.module.scss';

const TabBarNav = ({ children, dataIndex, number, isActive, onClick, ...rest }) => {
  return (
    <button
      type='button'
      className={`${styles.tabbutton} ${
        isActive ? styles['tabbutton--active'] : ''
      }`}
      onClick={onClick}
      data-index={dataIndex}
      style={{ ...rest }}
    >
      {children}
      <div className={styles.number}>{number}</div>
    </button>
  );
};

export { TabBarNav };
