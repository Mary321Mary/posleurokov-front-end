import styles from "./Header.module.scss";
import { Logo, Button, Link, Select } from "components";
import { useState, useEffect } from "react";
import { axiosAPI } from "plugins/axios";
import { useSelector } from "react-redux";
import store from "redux/stores";

const Header = () => {
  const [cities, setCities] = useState([]);
  const city = useSelector((state) => state.city);
  const PHONE = "+375 29 113-67-97";

  const getCities = async () => {
    const result = await axiosAPI.getCities();
    setCities(result.cities || []);
  };

  const setCity = (value) => {
    store.dispatch({ type: "ChangeCity", amount: value });
  };

  useEffect(() => {
    getCities();
  }, []);

  return (
    <>
      <div>
        <Logo />
        <Select
          value={city}
          options={[
            { text: "online", value: "online" },
            ...cities.map((city) => {
              return {
                text: city.name,
                value: city.name,
              };
            }),
            { text: "Все города", value: "Все города" },
          ]}
          onChange={(value) => setCity(value)}
        />
      </div>
      <div>
        <div>
          <p>Поможем выбрать</p>
          <p>{PHONE}</p>
        </div>
        <div className={styles["vertical-line"]}></div>
        <div>
          <Link
            path="/"
            fontFamily="Roboto-Bold"
            fontStyle="normal"
            fontWeight="700"
            fontSize="16px"
            lineHeight="19px"
            color="#5F6060"
            marginRight="10px"
          >
            Вход
          </Link>
          /
          <Link
            path="/"
            fontFamily="Roboto-Bold"
            fontStyle="normal"
            fontWeight="700"
            fontSize="16px"
            lineHeight="19px"
            color="#5F6060"
            marginLeft="10px"
          >
            Регистрация
          </Link>
        </div>
        <Button marginLeft="34px">Добавить занятие</Button>
      </div>
    </>
  );
};

export { Header };
