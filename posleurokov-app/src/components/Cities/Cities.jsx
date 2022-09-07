import styles from "./Cities.module.scss";
import { useState, useEffect } from "react";
import { Sheet, List, Link } from "components/shared";
import arrow from "assets/img/arrow-right.png";
import { axiosAPI } from "plugins/axios";
import store from "redux/stores";

const Cities = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getCities();
  }, []);

  const getCities = async () => {
    const result = await axiosAPI.getCities();
    setCities(result.cities || []);
  };

  const setCity = (item) => {
    store.dispatch({ type: "ChangeCity", amount: item });
    window.location.assign("/" + item);
  };

  return (
    <Sheet padding="36px 24px 36px 24px" maxWidth={"230px"} marginTop={"35px"}>
      <h3 className={styles.h3}>Города</h3>
      <Link
        className={styles.list}
        path="/Online"
        onClick={() => setCity("online")}
      >
        <img src={arrow} alt="arrow" />
        <div>Online</div>
      </Link>
      <List
        list={cities}
        path=""
        onClick={(event) => setCity(event.target.innerText)}
      />
      <Link
        className={styles.all_cities}
        path="/"
        onClick={() => setCity("all")}
      >
        <img src={arrow} alt="arrow" />
        <div>Все города</div>
      </Link>
    </Sheet>
  );
};

export { Cities };
