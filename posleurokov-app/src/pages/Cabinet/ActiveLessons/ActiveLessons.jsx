import styles from "./ActiveLessons.module.scss";
import { useState, useEffect } from "react";
import { Sheet, LeftPanel } from "components";
import { axiosAPI } from "plugins/axios";

const ActiveLessons = () => {
  const [active, setActive] = useState([]);
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
      setMainWidth('500px')
    }
  }

  const sendToArchive = async (id) => {
    let result = await axiosAPI.archivateLessons(id);
    if (result.status) {
      await getActive();
    }
  }

  const showActive = active.filter(elem => elem.name.includes(searchString)).map((elem) => {
    return (<tr>
      <td className={styles.status}>
        {elem.published == true ? <div>&#10004;</div> : <div>&#10005;</div>}
      </td>
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
      <td className={styles.price}>
        {elem.price}
      </td>
      <td>
        <a href={'/lesson/update/' + elem.id}><button>Изменить занятие</button></a>
        <button onClick={() => { sendToArchive(elem.id) }}>В архив</button>
      </td>
    </tr>)
  })

  const getActive = async () => {
    if (localStorage.getItem('token')) {
      let result = await axiosAPI.getActive();
      setActive(result.lessons)
    }
    else {
      window.location.replace('/login')
    }
  }

  useEffect(async () => {
    getSizes();
    await getActive();

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
      <LeftPanel active={'Active'} />
      <div className={styles.main}>
        <Sheet width={mainWidth} height={'auto'} padding={'7px 5px'}>
          <h3>Активные занятия</h3>
          <div className={styles.search}><div>Поиск</div><input type={'text'} value={searchString} onChange={(e) => setSearchString(e.target.value)}></input></div>
          <table>
            <thead>
              <tr><th className={styles.status}>
                Статус
              </th>
                <th className={styles.info}>
                  Занятия
                </th>
                <th className={styles.price}>
                  Цена
                </th>
                <th className={styles.actions}>
                  Действия
                </th>
                <th></th>
              </tr>
            </thead>
            <div className={styles.scroll}>
              <tbody>
                {showActive}
              </tbody>
            </div>
          </table>
        </Sheet>
      </div>
    </div>
  )
};

export { ActiveLessons };