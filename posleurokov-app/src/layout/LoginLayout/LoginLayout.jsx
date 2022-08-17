import styles from "./LoginLayout.module.scss";
import { Footer, Logo, Link } from "components";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  const PHONE = "+375 29 113-67-97";

  return (
    <>
      <header className={styles.header}>
        <div>
          <Link path="/">
            <Logo />
          </Link>
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

export default LoginLayout;
