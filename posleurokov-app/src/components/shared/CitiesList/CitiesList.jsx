import styles from './CitiesList.module.scss';
import { useState, useEffect } from 'react';
import arrow from "../../../assets/img/arrow-right.png";
import { axiosAPI } from '../../../plugins/axios';

const CitiesList = () => {
  const [cities, setCities] = useState([])

  useEffect(() => {
    getCities()
  }, [])

  const getCities = async () => {
    const result = await axiosAPI.getCities()
    setCities(result.cities)
  }

  return (
    <div>{cities.map((city, index) => {
      return <a key={index} href='/' className={styles.cities}>
        <img src={arrow}></img>
        <div>{city.name}</div>
      </a>
    })}</div>
  );
};

export { CitiesList };