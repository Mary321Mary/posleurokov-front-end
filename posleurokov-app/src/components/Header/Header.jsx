import styles from "./Header.module.scss";
import { useState } from "react";
import { Logo, Button, Link, Sheet, Select } from "components";
import { useOutsideClick } from "hooks";
import galochka from "assets/img/galochka.png";
import tel from "assets/img/teleph.svg";
import menu from "assets/img/Menu.svg";

const Header = () => {
  const [city, setCity] = useState("Гомель");
  const PHONE = "+375 29 113-67-97";

  const openNav = () => {
    document.getElementById("menu").style.width = "250px";
    document.getElementById("shadow").style.display = "block";
  };

  const closeNav = () => {
    document.getElementById("menu").style.width = "0";
    document.getElementById("shadow").style.display = "none";
  };

  const signOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  const ref = useOutsideClick(closeNav);

  return (
    <>
      <div ref={ref}>
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
          prepend={<img src={galochka} height="6px" alt="галочка" />}
          textDecoration="underline"
          textDecorationStyle="dashed"
          textUnderlineOffset="5px"
          minWidth="130px"
          onChange={(value) => setCity(value)}
        />
      </div>
      <div className={styles.tablet}>
        <Sheet display="flex" alignItems="center" padding="10px">
          <img src={tel} alt="Телефон" style={{ marginRight: "15.08px" }} />
          <div>
            <div
              style={{
                fontFamily: "Roboto-Medium",
                fontWeight: "500",
                fontSize: "14px",
                lineHeight: "16px",
                color: "#9E9E9E",
              }}
            >
              Поможем выбрать
            </div>
            <div
              style={{
                fontFamily: "Roboto-Medium",
                fontWeight: "500",
                fontSize: "16px",
                lineHeight: "19px",
                color: "#5F6060",
              }}
            >
              {PHONE}
            </div>
          </div>
        </Sheet>
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
        <Link path="/lesson/create">
          <div className={styles.button}>
            <Button>Добавить занятие</Button>
          </div>
        </Link>
      </div>
      <div className={styles.mobile}>
        <img
          src={menu}
          alt="menu"
          onClick={() => openNav()}
          className={styles.navImage}
        />
        <div className={styles.menu} id="menu">
          <a className={styles.closebtn} onClick={() => closeNav()}>
            &times;
          </a>
          {localStorage.getItem("token") === null ? (
            <div>
              <Link
                path="/login"
                fontFamily="Roboto-Bold"
                fontWeight="700"
                fontSize="16px"
                lineHeight="19px"
                color="#5F6060"
              >
                Вход
              </Link>
              <Link
                path="/signup"
                fontFamily="Roboto-Bold"
                fontWeight="700"
                fontSize="16px"
                lineHeight="19px"
                color="#5F6060"
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
              >
                email
              </Link>
              <Link
                path="/"
                fontFamily="Roboto-Bold"
                fontWeight="700"
                fontSize="16px"
                lineHeight="19px"
                color="#5F6060"
                onClick={signOut}
              >
                Выход
              </Link>
            </div>
          )}
          <Link path="/lesson/create">
            <Button>Добавить занятие</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export { Header };
