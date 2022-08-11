import styles from "./Additional.module.scss";
import { useState, useEffect } from "react";
import { axiosAPI } from "plugins/axios";

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
    <div
      className={`${styles.additional} ${
        price ? styles["price"] : styles["no-price"]
      }`}
      style={{ ...rest }}
    >
      {price ? (
        additional.price !== null ? (
          <p className={styles.exist}>{additional.price} Р.</p>
        ) : (
          <p className={styles.absent}>не указана</p>
        )
      ) : null}
      <p className={styles.name}>{additional.name}</p>
    </div>
  );
};

export { Additional };
