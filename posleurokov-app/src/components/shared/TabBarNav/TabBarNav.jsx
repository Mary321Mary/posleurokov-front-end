import React from 'react';
import styles from './TabBarNav.module.scss';

const TabBarNav = ({ children, number, logo, isActive, onClick, ...rest }) => {
  return (
    <button
      type='button'
      className={`${styles.tabbutton} ${
        isActive ? styles['tabbutton--active'] : ''
      }`}
      onClick={onClick}
      style={{ ...rest }}
    >
      {children}
      {number == -1 ? (
        <img src={logo} alt='Все кружки'/>
      ) : (
        <div className={styles.number}>{number}</div>
      )}
    </button>
  );
};

export { TabBarNav };
