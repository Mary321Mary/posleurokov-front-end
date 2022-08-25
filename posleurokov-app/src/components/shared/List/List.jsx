import { Link } from "components";
import styles from "./List.module.scss";
import arrow from "assets/img/arrow-right.png";

const List = ({ list, path, onClick }) => {
  const displayList = list.map((elem, index) => {
    return (
      <Link key={index} path={path} className={styles.list} onClick={onClick}>
        <img src={arrow} alt="arrow" />
        <div>{elem.name}</div>
      </Link>
    );
  });

  return <div>{displayList}</div>;
};

export { List };
