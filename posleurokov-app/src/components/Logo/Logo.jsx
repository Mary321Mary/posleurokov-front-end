import styles from './Logo.module.scss';
import logo from '../../assets/img/Logo.png';

const Logo = ({ ...rest }) => {
  return (
    <img
      src={logo}
      alt='Все кружки'
      className={styles.logo}
      style={{ ...rest }}
    />
  );
};

export { Logo };
