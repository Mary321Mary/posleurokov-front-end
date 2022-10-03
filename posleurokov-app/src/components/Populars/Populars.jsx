import styles from "./Populars.module.scss";
import { useState, useEffect } from "react";
import { Sheet, List } from "components";
import { axiosAPI } from "plugins/axios";
import { useSelector } from "react-redux";

const Populars = ({ path, ...rest }) => {
  const city = useSelector((state) => state.city);
  const [populars, setPopulars] = useState([]);

  useEffect(() => {
    getPopulars();
  }, [city]);

  const getPopulars = async () => {
    const result = await axiosAPI.getPopulars(city);
    setPopulars(result);
  };

  return (
    <Sheet
      padding="36px 24px 36px 24px"
      maxWidth="230px"
      marginTop="35px"
      {...rest}
    >
      <h3 className={styles.h3}>Популярное</h3>
      {populars !== null ? (
        Array.isArray(populars) ? (
          <List list={populars} path={`/catalogue/${city}`} />
        ) : (
          <div>{populars}</div>
        )
      ) : (
        <div>Loading post...</div>
      )}
    </Sheet>
  );
};

export { Populars };
