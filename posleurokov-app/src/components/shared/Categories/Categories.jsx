import React, {useState, useEffect} from "react";

import styles from "./Categories.module.scss";
import Masonry from "react-masonry-css";
import { axiosAPI } from "plugins/axios";

const Categories = ({ number, children, ...rest }) => {
  const [adv, setAdv] = useState({})

  const getAdv = async () => {
    let result = await axiosAPI.getAdvertisement()
    setAdv(result)
  }

  useEffect(() => {
    getAdv()
  }, [])

  const breakpointColumnsObj = {
    default: 3,
    1250: 2,
    899: 1,
  };

  return (
    <div style={{ ...rest }} className={styles.categories}>
      {adv.advertisement !== undefined ? <div className={styles.info}>
        <div className="content" dangerouslySetInnerHTML={{__html: adv.advertisement.replace('/media/advertisement/', 'https://vsekruzhki.by:81/media/advertisement/')}}></div>
      </div> : null}
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
