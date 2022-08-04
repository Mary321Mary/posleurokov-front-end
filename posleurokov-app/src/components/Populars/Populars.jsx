import styles from './Populars.module.scss';
import { useState, useEffect } from 'react';
import { Sheet, List } from 'components/shared';
import { axiosAPI } from 'plugins/axios';

const Populars = () => {
  const [populars, setPopulars] = useState([])

  useEffect(() => {
    getPopulars()
  }, [])

  const getPopulars = async () => {
    const result = await axiosAPI.getPopulars();
    setPopulars(result);
  }

  return (
    <Sheet padding='36px 24px 36px 24px' maxWidth={'230px'} marginTop={'35px'}>
      <h3 className={styles.h3}>Популярное</h3>
      {populars !== null ? (
        typeof populars !== 'string' ? (
          <List list={populars} />
        ) : (
          <div>{populars}</div>
        )
      ) : (
        <div>Loading post...</div>
      )}
    </Sheet>
  );
};

export { Populars };