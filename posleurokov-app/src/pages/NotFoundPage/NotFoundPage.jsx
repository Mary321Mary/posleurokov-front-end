import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (<div className={styles.notfound}>
    <h1>Такой страницы нет!</h1>
    <a href='/'>Перейти на главную?</a>
  </div>)
};

export { NotFoundPage };
