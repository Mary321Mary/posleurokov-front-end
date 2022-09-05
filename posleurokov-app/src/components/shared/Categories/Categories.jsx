import React from "react";
import styles from "./Categories.module.scss";
import Masonry from "react-masonry-css";

const Categories = ({ number, children, ...rest }) => {
  const breakpointColumnsObj = {
    default: 3,
    1250: 2,
    899: 1,
  };

  return (
    <div style={{ ...rest }} className={styles.categories}>
      <div className={styles.info}>Уважаемый гость!<br />
        Мы ожидаем подтверждения информации о некоторых кружках и секциях, поэтому в ближайшие дни сайт будет продолжать  наполняться.<br />
        Также вы можете вступить в нашу группу в Viber и получать актуальную информацию:&nbsp;
        <a href="https://invite.viber.com/?g2=AQBGysy%2BbfumIUw%2BZIFczCGeIehDAphAotMS7%2BfBbDOf0QwNFbDjWeb8ZlY7td52" target={'_blank'}>Группа в Viber</a></div>
      <div className={styles.label}>ВСЕ ЗАНЯТИЯ</div>
      <div className={styles.number}>{number}</div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.masonry_grid}
        columnClassName={styles.masonry_grid_column}
      >
        {children}
      </Masonry>
    </div >
  );
};

export { Categories };
