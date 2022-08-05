import styles from './Additional.module.scss';
import { useState, useEffect } from 'react';
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
      {additional.price !== null ? (
        <p className={styles.exist}>{additional.price} Р.</p>
      ) : (
        <p className={styles.absent}>не указана</p>
      )}
      <p className={styles.name}>{additional.name}</p>
    </div>
  );
};

export { Additional };