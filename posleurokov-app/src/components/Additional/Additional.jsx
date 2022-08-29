import styles from "./Additional.module.scss";
import { useState, useEffect } from "react";
import { axiosAPI } from "plugins/axios";
import bgr from "assets/img/bgr.svg";

const Additional = ({ price, ...rest }) => {
  const [additional, setAdditional] = useState([]);

  useEffect(() => {
    getAdditional();
  }, []);

  const getAdditional = async () => {
    const result = await axiosAPI.getAdditional();
    setAdditional(result);
  };

  return (
    <a href={`/lesson/${additional.id}`} style={{ ...rest }}>
      {additional.image !== undefined && additional.image.image !== null ? (
        <div
          className={`${styles.additional} `}
          style={{
            background: `
              url(${bgr}) bottom no-repeat,
              url(${
                process.env.REACT_APP_BASE_URL + additional.image.image
              }) no-repeat`,
            backgroundSize: "auto, 230px 250px",
          }}
        >
          {price ? (
            <div className={styles.union}>
              {additional.price !== null ? (
                <p className={styles.exist}>{additional.price} Р.</p>
              ) : (
                <p className={styles.absent}>не указана</p>
              )}
            </div>
          ) : (
            <div
              style={{
                width: "100px",
                height: "65px",
                marginLeft: "146px",
              }}
            ></div>
          )}
          <p className={styles.name}>{additional.name}</p>
        </div>
      ) : (
        <div
          className={`${styles.additional} ${
            price ? styles["price"] : styles["no-price"]
          }`}
        >
          {price ? (
            additional.price !== null ? (
              <p className={styles.exist}>{additional.price} Р.</p>
            ) : (
              <p className={styles.absent}>не указана</p>
            )
          ) : (
            <div
              style={{
                width: "100px",
                height: "0px",
                marginLeft: "146px",
              }}
            ></div>
          )}
          <p className={styles.name}>{additional.name}</p>
        </div>
      )}
    </a>
  );
};

export { Additional };
