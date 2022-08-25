import styles from './Forms.module.scss';

const SubscribeForm = ({ isLogin, handler }) => {
  if (!isLogin) {
    return (
      <div>
        <div className={styles.text}>
          Для того, чтобы подписаться, необходимо войти! Перейти?
        </div>
        <div className={[styles.text, styles.submit].join(' ')}>
          <button onClick={handler}>Нет</button><a href="/login"><button>Да</button></a>
        </div>
      </div>
    );
  }
  else {
    return (
      <div>
        <div className={styles.text}>
          Вы подписаны!
        </div>
        <div className={[styles.text, styles.submit].join(' ')}>
          <button onClick={handler}>Ок</button>
        </div>
      </div>
    );
  }
};

export { SubscribeForm };