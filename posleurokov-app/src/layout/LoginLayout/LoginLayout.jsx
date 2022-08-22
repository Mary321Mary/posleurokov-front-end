import styles from "./LoginLayout.module.scss";
import { Footer, Logo, Link, Sheet } from "components";
import { Outlet } from "react-router-dom";
import { useOutsideClick } from "hooks";
import tel from "assets/img/teleph.svg";
import menu from "assets/img/Menu.svg";

const LoginLayout = () => {
  const PHONE = "+375 29 113-67-97";

  const openNav = () => {
    document.getElementById("menu").style.width = "250px";
    document.getElementById("shadow").style.display = "block";
  };

  const closeNav = () => {
    document.getElementById("menu").style.width = "0";
    document.getElementById("shadow").style.display = "none";
  };

  const ref = useOutsideClick(closeNav);

  return (
    <>
      <header ref={ref} className={styles.header}>
        <div>
          <Link path="/">
            <Logo />
          </Link>
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
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </>
  );
};

export { LoginLayout };
