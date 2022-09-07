import styles from './NotFoundPage.module.scss';
import Helmet from "react-helmet";

const NotFoundPage = () => {
  return (<div className={styles.notfound}>
    <Helmet title="Ошибка" />
    <h1>Такой страницы нет!</h1>
    <a href='/'>Перейти на главную?</a>
  </div>)
};

export { NotFoundPage };
