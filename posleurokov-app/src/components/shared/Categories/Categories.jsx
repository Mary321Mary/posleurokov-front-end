import React from 'react';
import styles from './Categories.module.scss';

const Categories = ({ number, children, ...rest }) => {
  return (
    <div style={{ ...rest }} className={styles.categories}>
      <div className={styles.label}>Все занятия</div>
      <div className={styles.number}>{number}</div>
      {children}
    </div>
  );
};

export { Categories };
