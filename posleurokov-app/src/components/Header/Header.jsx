import styles from "./Header.module.scss";
import { Logo, Button, Link, Select } from "components";
import { useState } from "react";

const Header = () => {
  const [city, setCity] = useState("Гомель");
  const PHONE = "+375 29 113-67-97";
  return (
    <>
      <div>
        <Logo />
        <Select
          value={city}
          options={[
            { text: "Гомель", value: "Гомель" },
            { text: "Минск", value: "Минск" },
            { text: "Гродно", value: "Гродно" },
            { text: "Витебск", value: "Витебск" },
            { text: "Брест", value: "Брест" },
            { text: "Могилёв", value: "Могилёв" },
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
            path="/login"
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
            path="/signup"
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
