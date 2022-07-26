import React from 'react';
import styles from './Category.module.scss';
import logo from 'assets/img/art.png';

const Category = ({ label, number, image, children, ...rest }) => {
  return (
    <div
      className={styles.category}
      style={{ ...rest }}
    >
      <div className={styles.header}>
        <img src={logo} alt='Все кружки'/>
        <div className={styles.label}>
          {label}
          <div className={styles.number}>{number}</div>
        </div>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

export { Category };