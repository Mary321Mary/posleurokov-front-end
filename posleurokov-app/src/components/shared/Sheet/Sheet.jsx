import React from 'react';
import styles from './Sheet.module.scss';

const Sheet = ({ children, ...rest }) => {
  return (
    <div
      className={styles.sheet}
      style={{ ...rest }}
    >
      { children }
    </div>
  );
};

export { Sheet };
