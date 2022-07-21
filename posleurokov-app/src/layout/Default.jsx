import styles from './Default.module.scss';
import { Header, Footer } from 'components';
const Default = ({ children }) => {
  return (
    <>
      <header className={styles.header}>
        <Header />
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </>
  );
};

export default Default;
