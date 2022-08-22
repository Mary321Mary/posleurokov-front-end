import styles from "./Header.module.scss";
import { Logo, Button, Link, Select } from "components";
import { useState } from "react";

const Header = () => {
  const [city, setCity] = useState("Гомель");
  const PHONE = "+375 29 113-67-97";

  const signOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <div>
        <Link path="/">
          <Logo />
        </Link>
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
        {localStorage.getItem("token") === null ? (
          <div>
            <Link
              path="/login"
              fontFamily="Roboto-Bold"
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
              fontWeight="700"
              fontSize="16px"
              lineHeight="19px"
              color="#5F6060"
              marginLeft="10px"
            >
              Регистрация
            </Link>
          </div>
        ) : (
          <div>
            <Link
              path="/"
              fontFamily="Roboto-Bold"
              fontWeight="700"
              fontSize="16px"
              lineHeight="19px"
              color="#5F6060"
              marginRight="10px"
            >
              email
            </Link>
            /
            <Link
              path="/"
              fontFamily="Roboto-Bold"
              fontWeight="700"
              fontSize="16px"
              lineHeight="19px"
              color="#5F6060"
              marginLeft="10px"
              onClick={signOut}
            >
              Выход
            </Link>
          </div>
        )}
        <Button marginLeft="34px">Добавить занятие</Button>
      </div>
    </>
  );
};

export { Header };
