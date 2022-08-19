import styles from "./Default.module.scss";
import { Header, Footer } from "components";
import { Outlet } from "react-router-dom";

const Default = () => {
  return (
    <>
      <header className={styles.header}>
        <Header />
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

export default Default;
