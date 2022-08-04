import styles from './Additional.module.scss';
import { useState, useEffect } from 'react';
import add from 'assets/img/additional.svg';
import union from 'assets/img/Union.svg';
import bgr from 'assets/img/bgr.svg';
import { axiosAPI } from 'plugins/axios';

const Additional = () => {
  const [additional, setAdditional] = useState([]);

  useEffect(() => {
    getAdditional();
  }, [])

  const getAdditional = async () => {
    const result = await axiosAPI.getAdditional();
    setAdditional(result);
  }

  return (
    <div className={styles.additional}>
      <img src={add} alt='Занятие' className={styles.add} />
      <img src={union} alt='флажок' className={styles.union} />
      <div>
        {additional.price !== null ? (
          <p className={styles.exist}>{additional.price} Р.</p>
        ) : (
          <p className={styles.absent}>не указана</p>
        )}
        <img src={bgr} alt='темный фон' />
      </div>
      <p className={styles.name}>{additional.name}</p>
    </div>
  );
};

export { Additional };