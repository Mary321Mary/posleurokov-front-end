import styles from './Cities.module.scss';
import { useState, useEffect } from 'react';
import { Sheet, List } from 'components/shared';
import arrow from "assets/img/arrow-right.png";
import { axiosAPI } from 'plugins/axios';

const Cities = () => {
  const [cities, setCities] = useState([])

  useEffect(() => {
    getCities()
  }, [])

  const getCities = async () => {
    const result = await axiosAPI.getCities()
    setCities(result.cities)
  }

  return (
    <Sheet padding='36px 24px 36px 24px' max-width={'230px'} margin-top={'35px'}>
      <h3 className={styles.h3}>Города</h3>
      <List list={cities} />
      <a href='/' className={styles.all_cities}>
        <img src={arrow}></img>
        <div>Все города</div>
      </a>
    </Sheet>
  );
};

export { Cities };