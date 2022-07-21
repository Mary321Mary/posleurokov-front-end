import React from 'react';
import styles from './Sheet.module.scss';

const Sheet = ({ children }) => {
  return (
    <div className={styles.sheet}>
      { children }
    </div>
  );
};

export { Sheet };
