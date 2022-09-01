import styles from "./Header.module.scss";
import { Logo, Button, Link, Select, Sheet, ModalWindow } from "components";
import { useState, useEffect } from "react";
import { useOutsideClick } from "hooks";
import galochka from "assets/img/galochka.png";
import tel from "assets/img/teleph.svg";
import menu from "assets/img/Menu.svg";
import { axiosAPI } from "plugins/axios";
import { useSelector } from "react-redux";
import store from "redux/stores";
import { CheckIfOrganizationForm } from "./CheckIfOrganizationForm/CheckIfOrganizationForm";

const Header = () => {
  const [cities, setCities] = useState([]);
  const city = useSelector((state) => state.city);
  const [cityTitle, setCityTitle] = useState("Гомель");
  const [showModal, setShowModal] = useState(false);
  const PHONE = "+375 29 113-67-97";

  const getCities = async () => {
    const result = await axiosAPI.getCities();
    setCities(result.cities || []);
  };

  const setCity = (value) => {
    if (value === "all") {
      value = "Все города";
    }
    if (value === "online") {
      value = "Online";
    }
    setCityTitle(value);
    if (value === "Все города") {
      value = "all";
    }
    if (value === "Online") {
      value = "online";
    }
    store.dispatch({ type: "ChangeCity", amount: value });
  };

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

  useEffect(() => {
    getCities();
    setCity(city);
  }, [city]);

  const checkIfOrganization = () => {
    let name = localStorage.getItem("name");
    if (name == null) {
      setShowModal(true);
    } else {
      window.location.href = "/lesson/create";
    }
  };

  return (
    <>
      <ModalWindow
        show={showModal}
        handler={() => {
          setShowModal(false);
        }}
      >
        <CheckIfOrganizationForm
          handler={() => {
            setShowModal(false);
          }}
        />
      </ModalWindow>
      <div ref={ref}>
        <Link path="/">
          <Logo />
        </Link>
        <Select
          value={cityTitle}
          options={[
            { text: "Online", value: "Online" },
            ...cities.map((city) => {
              return {
                text: city.name,
                value: city.name,
              };
            }),
            { text: "Все города", value: "Все города" },
          ]}
          prepend={<img src={galochka} height="6px" alt="галочка" />}
          minWidth="150px"
          textDecoration="underline"
          textDecorationStyle="dashed"
          textUnderlineOffset="5px"
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
              path="/cabinet/profile"
              fontFamily="Roboto-Bold"
              fontWeight="700"
              fontSize="16px"
              lineHeight="19px"
              color="#5F6060"
              marginRight="10px"
            >
              Мой Профиль
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
        <div className={styles.button}>
          <Button onClick={checkIfOrganization}>Добавить занятие</Button>
        </div>
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
                path="/cabinet/profile"
                fontFamily="Roboto-Bold"
                fontWeight="700"
                fontSize="16px"
                lineHeight="19px"
                color="#5F6060"
              >
                Мой Профиль
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
            <Button onClick={checkIfOrganization}>Добавить занятие</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export { Header };
