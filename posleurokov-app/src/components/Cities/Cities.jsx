import styles from './Cities.module.scss';
import { Sheet } from 'components/shared';
import { useState, useEffect } from 'react';
import arrow from "../../assets/img/arrow-right.png";
import { axiosAPI } from '../../plugins/axios';

const Cities = () => {
  const [cities, setCities] = useState([])

  useEffect(() => {
    getCities()
  }, [])

  const listCities = cities.map((city, index) => {
    return <a key={index} href='/' className={styles.cities}>
      <img src={arrow}></img>
      <div>{city.name}</div>
    </a>
  })

  const getCities = async () => {
    const result = await axiosAPI.getCities()
    setCities(result.cities)
  }

  return (
    <Sheet padding='36px 24px 36px 24px' max-width={'230px'} margin-top={'35px'}>
      <h3 className={styles.h3}>Города</h3>
      {listCities}
      <a href='/' className={styles.cities}>
        <img src={arrow}></img>
        <div>Все города</div>
      </a>
    </Sheet>
  );
};

export { Cities };