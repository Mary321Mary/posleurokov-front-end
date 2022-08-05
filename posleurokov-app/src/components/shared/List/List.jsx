import styles from './List.module.scss';
import arrow from 'assets/img/arrow-right.png';

const List = ({ list }) => {
  const displayList = list.map((elem, index) => {
    return (
      <a key={index} href="/" className={styles.list}>
        <img src={arrow} alt="arrow" />
        <div>{elem.name}</div>
      </a>
    );
  });

  return <div>{displayList}</div>;
};

export { List };
