import styles from './Forms.module.scss';
import warning from 'assets/img/info.png';
import { useEffect, useState } from "react";
import { axiosAPI } from "plugins/axios";

const CorrectionForm = ({ id, handler }) => {
  const [cause, setCause] = useState('Выбрать причину')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const sendMessage = async () => {
    if (cause != 'Выбрать причину' && message != '' && (/\S+@\S+\.\S+/.test(email) || email == '')) {
      let correction = {
        'email': email,
        'reason': cause,
        'info': message
      }

      let result = await axiosAPI.sendCorrection(id, correction);
      if (result['Ok']) {
        setIsSuccess(true)
      }
      else {
        alert('Произошла ошибка!')
      }
    }
    else {
      alert('Корректно заполните данные!')
    }
  }

  if (isSuccess) {
    return (
      <div>
        <div className={styles.text}>
          Ваше сообщение отправлено!
        </div>
        <div className={[styles.text, styles.submit].join(' ')}>
          <button onClick={handler}>Ок</button>
        </div>
      </div>
    );
  }
  else {
    return (
      <div>
        <h3 className={styles.head}><img src={warning}></img>Пожаловаться или исправить?</h3>
        <div className={styles.text}>
          Причина:
          <select value={cause} onChange={(e) => { setCause(e.target.value) }}>
            <option value={'Выбрать причину'}>Выбрать причину</option>
            <option value={'Услуга недоступна или объявление содержит ошибки'}>Услуга недоступна или объявление содержит ошибки</option>
            <option value={'Мошенничество'}>Мошенничество</option>
            <option value={'Повторяющееся объявление'}>Повторяющееся объявление</option>
            <option value={'Спам'}>Спам</option>
            <option value={'Неправильная категория'}>Неправильная категория</option>
            <option value={'Другое'}>Другое</option>
          </select>
          <div>Ваш Email:</div>
          <input type={'email'} value={email} onChange={(e) => { setEmail(e.target.value) }} required={true}></input>
          <div>Сообщение (300):</div>
          <textarea value={message} onChange={(e) => { setMessage(e.target.value) }} maxLength={300} required={true}></textarea>
        </div>
        <div className={[styles.text, styles.submit].join(' ')}>
          <button onClick={handler}>Не отправлять</button><button onClick={sendMessage}>Отправить</button>
        </div>
      </div>
    );
  }
};

export { CorrectionForm };