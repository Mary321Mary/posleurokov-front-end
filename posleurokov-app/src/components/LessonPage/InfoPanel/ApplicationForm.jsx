import styles from './Forms.module.scss';
import warning from 'assets/img/info.png';
import { useState, useEffect } from "react";
import { axiosAPI } from "plugins/axios";

const ApplicationForm = ({ id, handler }) => {
  const [phone, setPhone] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      setIsLogin(true)
    }
    else {
      setIsLogin(false)
    }
  }, [])

  const sendPhone = async () => {
    if (/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i.test(phone)) {
      let result = await axiosAPI.sendApplication(id, phone);
      if (result['Ok']) {
        setIsSuccess(true)
      }
      else {
        alert('Произошла ошибка!')
      }
    }
    else {
      alert('Корректно введите телефон!')
    }
  }

  if (isSuccess) {
    return (
      <div>
        <div className={styles.text}>
          Ваш телефон отправлен!
        </div>
        <div className={[styles.text, styles.submit].join(' ')}>
          <button onClick={handler}>Ок</button>
        </div>
      </div>
    );
  }
  else if (!isLogin) {
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
        <h3 className={styles.head}><img src={warning}></img>Отправить контакты для связи с вами?</h3>
        <div className={styles.text}>
          <input type={'tel'} value={phone} onChange={(e) => { setPhone(e.target.value) }} required={true} placeholder={'Телефон для связи с нами (Пример: +375251234567)'}></input>
        </div>
        <div className={[styles.text, styles.submit].join(' ')}>
          <button onClick={handler}>Не отправлять</button><button onClick={sendPhone}>Отправить</button>
        </div>
      </div>
    );
  }
};

export { ApplicationForm };