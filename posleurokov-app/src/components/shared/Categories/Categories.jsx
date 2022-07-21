import React from 'react';
import styles from './Categories.module.scss';

const Categories = ({ number, children, ...rest }) => {
  return (
    <div style={{ ...rest }}>
      <div className={styles.label}>ВСЕ ЗАНЯТИЯ</div>
      <div className={styles.number}>{number}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export { Categories };