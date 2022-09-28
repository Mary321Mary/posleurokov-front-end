import styles from "./Additional.module.scss";
import { useState, useEffect } from "react";
import { axiosAPI } from "plugins/axios";
import bgr from "assets/img/bgr.svg";

const Additional = ({ price, ...rest }) => {
  const [additional, setAdditional] = useState([]);
  const [style, setStyle] = useState(true);

  useEffect(() => {
    getAdditional();
  }, []);

  const getAdditional = async () => {
    const result = await axiosAPI.getAdditional();
    if (result !== undefined) {
      setStyle(true);
      setAdditional(result);
    } else {
      setStyle(false);
    }
  };

  return (
    <div className={`${style ? styles.show : styles.notshow}`}>
      <a
        href={`/lesson/${additional.id}`}
        style={{
          textDecoration: "none",
          ...rest,
        }}
      >
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
                {additional.hasFee ? (
                  <p className={styles.exist}>Платно</p>
                ) : (
                  <p className={styles.absent}>Бесплатно</p>
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
              additional.hasFee ? (
                <p className={styles.exist}>Платно</p>
                ) : (
                <p className={styles.absent}>Бесплатно</p>
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
    </div>
  );
};

export { Additional };
