import React from 'react';
import styles from './Button.module.scss';

const Button = ({ type = 'button', children, onClick, ...rest }) => {
  return (
    <button
      className={styles.button}
      type={type}
      style={{ ...rest }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };
