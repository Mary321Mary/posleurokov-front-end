import styles from './Forms.module.scss';
import { useState, useEffect } from "react";

const CheckIfOrganizationForm = ({ handler }) => {
  if (localStorage.getItem('token') == null) {
    return <div>
      <div className={styles.text}>
        Вы не можете создать занятие, так как не вошли в аккаунт!<br />
        Чтобы создать организацию, необходимо:<br />
        1) Зарегистрироваться или войти в аккаунт;<br />
        2) Заполнить поля организации и сохранить изменения.<br />
        Перейти на страницу входа?
      </div>
      <div className={[styles.text, styles.submit].join(' ')}>
        <button onClick={handler}>Нет</button><a href='/login'><button>Да</button></a>
      </div>
    </div>
  }
  else if (localStorage.getItem('name') == null) {
    return <div>
      <div className={styles.text}>
        Вы не можете создать занятие, так как не являетесь организатором!<br />
        Чтобы создать организацию, необходимо:<br />
        1) Зарегистрироваться или войти в аккаунт;<br />
        2) Заполнить поля организации и сохранить изменения.<br />
        Перейти на страницу профиля?
      </div>
      <div className={[styles.text, styles.submit].join(' ')}>
        <button onClick={handler}>Нет</button><a href='/cabinet/profile'><button>Да</button></a>
      </div>
    </div>
  }
  else {
    return <div>
      <div className={styles.text}>
        Все ок!
      </div>
      <div className={[styles.text, styles.submit].join(' ')}>
        <button onClick={handler}>Ок</button>
      </div>
    </div>
  }
};

export { CheckIfOrganizationForm };