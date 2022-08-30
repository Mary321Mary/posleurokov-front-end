import React, { useState, useEffect } from "react";
import styles from "./Categories.module.scss";
import Masonry from 'react-masonry-css';

const Categories = ({ number, children, ...rest }) => {
  const [columnCount, setColumnCount] = useState(3);

  const getCount = () => {
    let innerWidth = window.outerWidth;

    if (innerWidth > 1024) {
      setColumnCount(3)
    } else if (innerWidth >= 760 && innerWidth <= 1024) {
      setColumnCount(2)
    } else {
      setColumnCount(1)
    }
  };

  useEffect(() => {
    getCount();

    function handleWindowResize() {
      getCount();
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div style={{ ...rest }} className={styles.categories}>
      <div className={styles.label}>ВСЕ ЗАНЯТИЯ</div>
      <div className={styles.number}>{number}</div>
      <Masonry
        breakpointCols={columnCount}
        className={styles.masonry_grid}
        columnClassName={styles.masonry_grid_column}>
        {children}
      </Masonry>
    </div>
  );
};

export { Categories };
