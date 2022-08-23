import styles from "./Subscriptions.module.scss";
import { useState, useEffect } from "react";
import { Sheet, LeftPanel } from "components";
import { axiosAPI } from "plugins/axios";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [mainWidth, setMainWidth] = useState('')
  const [searchString, setSearchString] = useState('')

  const getSizes = () => {
    let innerWidth = window.outerWidth;

    if (innerWidth > 1024) {
      setMainWidth('880px')
    }
    else if (innerWidth > 700 && innerWidth <= 1024) {
      setMainWidth('550px')
    }
    else {
      setMainWidth('440px')
    }
  }

  const unSubscribe = async (id) => {
    let result = await axiosAPI.unSubscribeUser(id);
    if (result.status) {
      await getSubscriptions();
    }
  }

  const showSubscriptions = subscriptions.filter(elem => elem.name.includes(searchString)).map((elem) => {
    return (<tr>
      <td className={styles.info}>
        <div className={styles.name}>{elem.name}</div>
        <div>
          {elem.categories.map((item) => {
            return (<div className={styles.category}>{item}</div>)
          })}
        </div>
        <div>
          Адрес: {elem.address}
        </div>
        <div>
          Возраст: {elem.age}
        </div>
        <div>
          Пол: {elem.sex}
        </div>
        <div>
          {elem.info}
        </div>
      </td>
      <td>
        {elem.price}
      </td>
      <td>
        <a href={'/lesson/' + elem.id}><button>Перейти на страницу</button></a>
        <button onClick={() => { unSubscribe(elem.id) }}>Отписаться</button>
      </td>
    </tr>)
  })

  const getSubscriptions = async () => {
    if (localStorage.getItem('token')) {
      let result = await axiosAPI.getSubscriptions();
      setSubscriptions(result.subscriptions)
    }
    else {
      window.location.replace('/login')
    }
  }

  useEffect(async () => {
    getSizes();
    await getSubscriptions()

    function handleWindowResize() {
      getSizes();
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div className={styles.page}>
      <LeftPanel active={'Subscriptions'} />
      <div className={styles.main}>
        <Sheet width={mainWidth} height={'auto'} padding={'7px 5px'}>
          <h3>Мои подписки</h3>
          <div className={styles.search}><div>Поиск</div><input type={'text'} value={searchString} onChange={(e) => setSearchString(e.target.value)}></input></div>
          <table>
            <thead>
              <tr>
                <th className={styles.info}>
                  Занятия
                </th>
                <th className={styles.price}>
                  Цена
                </th>
                <th className={styles.actions}>
                  Действия
                </th></tr>
            </thead>
            <div className={styles.scroll}>
              <tbody>
                {showSubscriptions}
              </tbody>
            </div>
          </table>
        </Sheet>
      </div>
    </div>
  )
};

export { Subscriptions };