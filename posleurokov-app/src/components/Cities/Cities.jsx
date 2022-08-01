import styles from './Cities.module.scss';
import { Sheet, CitiesList } from 'components/shared';
import arrow from "../../assets/img/arrow-right.png";

const Cities = () => {
  return (
    <Sheet padding='36px 24px 36px 24px' max-width={'230px'} margin-top={'35px'}>
      <h3 className={styles.h3}>Города</h3>
      <CitiesList />
      <a href='/' className={styles.all_cities}>
        <img src={arrow}></img>
        <div>Все города</div>
      </a>
    </Sheet>
  );
};

export { Cities };