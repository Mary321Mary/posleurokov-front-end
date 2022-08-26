import styles from "./LeftPanel.module.scss";
import { useState, useEffect } from "react";
import { Sheet } from "components";
import { axiosAPI } from "plugins/axios";

const LeftPanel = ({ active }) => {
  const [sheetWidth, setSheetWidth] = useState('');
  const [sheetPadding, setSheetPadding] = useState('');
  const [sheetHeight, setSheetHeight] = useState('');
  const [sheetMargin, setSheetMargin] = useState('')
  const [activeCount, setActiveCount] = useState(0);
  const [archiveCount, setArchiveCount] = useState(0);

  const getSizes = () => {
    let innerWidth = window.outerWidth;

    if (innerWidth > 1024) {
      setSheetWidth('226px')
      setSheetHeight('310px')
      setSheetPadding('10px 15px 20px 15px')
      setSheetMargin('0px')
    }
    else if (innerWidth > 700 && innerWidth <= 1024) {
      setSheetWidth('177px')
      setSheetHeight('240px')
      setSheetPadding('10px 15px 20px 15px')
      setSheetMargin('0px')
    }
    else {
      setSheetWidth('420px')
      setSheetHeight('310px')
      setSheetPadding('10px 15px 20px 15px')
      setSheetMargin('15px')
    }
  }

  const getCounts = async () => {
    if (localStorage.getItem('token')) {
      let result = await axiosAPI.getProfileCounts();
      setActiveCount(result.active)
      setArchiveCount(result.archive)
    }
    else {
      window.location.replace('/login')
    }
  }

  useEffect(async () => {
    getSizes()
    await getCounts()

    function handleWindowResize() {
      getSizes();
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [])

  return (
    <Sheet width={sheetWidth} height={sheetHeight} padding={sheetPadding} marginBottom={sheetMargin}>
      <div className={styles.section}>
        <a href="/cabinet/profile"><button className={[styles.name, styles.button, active == 'Profile' ? styles.active : ''].join(' ')}>Профиль</button></a>
      </div>
      <div className={styles.section}>
        <a href="/cabinet/subscriptions"><button className={[styles.name, styles.button, active == 'Subscriptions' ? styles.active : ''].join(' ')}>Подписки</button></a>
      </div>
      <div className={styles.section}>
        <div className={styles.name} style={{ marginLeft: '5px' }}>Мои занятия</div>
        <a href="/cabinet/active">
          <button className={[styles.additional, styles.button, active == 'Active' ? styles.active : ''].join(' ')}>
            Активные
            <div className={styles.number}>{activeCount}</div>
          </button>
        </a>
        <a href="/cabinet/archive">
          <button className={[styles.additional, styles.button, active == 'Archive' ? styles.active : ''].join(' ')}>
            В архиве
            <div className={styles.number}>{archiveCount}</div>
          </button>
        </a>
      </div>
    </Sheet>
  )
};

export { LeftPanel };
