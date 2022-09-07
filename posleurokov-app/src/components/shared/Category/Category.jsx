import React, { useState } from "react";
import styles from "./Category.module.scss";
import { Link } from "components";
import logo from "assets/img/img.png";
import galochka from "assets/img/galochka.png";
import galochkaRaskruta from "assets/img/galochkaRaskruta.png";
import store from "redux/stores";
import { useSelector } from "react-redux";

const Category = ({ label, number, image, children, ...rest }) => {
  const city = useSelector((state) => state.city);
  const [img, setImg] = useState(galochka);

  const showCategory = () => {
    if (window.screen.width < 760) {
      const categories = document.getElementById(label);
      if (categories.style.display === "block") {
        setImg(galochka);
        categories.style.display = "none";
      } else {
        setImg(galochkaRaskruta);
        categories.style.display = "block";
      }
    }
  };

  const setCategory = () => {
    store.dispatch({ type: "SetCategory", amount: label });
  };

  return (
    <div className={styles.category} style={{ ...rest }}>
      <div className={styles.header} onClick={() => showCategory()}>
        {image !== null ? (
          <img
            src={process.env.REACT_APP_BASE_URL + image}
            className={styles.logo}
            alt="Категория"
          />
        ) : (
          <img src={logo} className={styles.absent} alt="Категория" />
        )}
        <Link path={`/catalogue/${city}/${label}`} onClick={setCategory}>
          <div className={styles.label}>
            {label}
            <div className={styles.number}>{number}</div>
          </div>
        </Link>
        <img
          src={img}
          className={`${
            img === galochka ? styles["galochka"] : styles["galochkaRaskruta"]
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
