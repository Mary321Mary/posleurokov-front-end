import React from "react";
import styles from "./Categories.module.scss";
import Masonry from "react-masonry-css";

const Categories = ({ number, children, ...rest }) => {
  const breakpointColumnsObj = {
    default: 3,
    1400: 2,
    760: 1,
  };

  return (
    <div style={{ ...rest }} className={styles.categories}>
      <div className={styles.label}>ВСЕ ЗАНЯТИЯ</div>
      <div className={styles.number}>{number}</div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.masonry_grid}
        columnClassName={styles.masonry_grid_column}
      >
        {children}
      </Masonry>
    </div>
  );
};

export { Categories };
