import React, { useState } from 'react';
import styles from './Category.module.scss';
import logo from 'assets/img/art.png';
import galochka from 'assets/img/galochka.png';
import galochkaRaskruta from 'assets/img/galochkaRaskruta.png';

const Category = ({ label, number, image, children, ...rest }) => {
  const [img, setImg] = useState(galochka);

  const showCategory = () => {
    if (window.screen.width < 760) {
      const categories = document.getElementById(label);
      if (categories.style.display === 'block') {
        setImg(galochka);
        categories.style.display = 'none';
      } else {
        setImg(galochkaRaskruta);
        categories.style.display = 'block';
      }
    }
  };

  return (
    <div className={styles.category} style={{ ...rest }}>
      <div className={styles.header} onClick={() => showCategory()}>
        <img src={logo} className={styles.logo} alt="Все кружки" />
        <div className={styles.label}>
          {label}
          <div className={styles.number}>{number}</div>
        </div>
        <img
          src={img}
          className={`${
            img === galochka ? styles['galochka'] : styles['galochkaRaskruta']
          }`}
          alt="Галочка"
        />
      </div>
      <div id={label} className={styles.categories}>
        {children}
      </div>
    </div>
  );
};

export { Category };
