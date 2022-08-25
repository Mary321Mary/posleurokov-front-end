import styles from "./Online.module.scss";
import { Button } from "components";
import store from "redux/stores";

const Online = ({ number, ...rest }) => {
  const onlineCatalogue = () => {
    store.dispatch({ type: "ChangeCity", amount: "online" });
  };

  return (
    <div className={styles.online} style={{ ...rest }}>
      <div>
        <div className={styles.label}>
          Каталог кружков, секций и курсов онлайн
        </div>
        <div className={styles.count}>Найдено: {number}</div>
      </div>
      <Button
        border="1.5px solid #FFFFFF"
        backgroundColor="transparent"
        onClick={onlineCatalogue}
      >
        Открыть
      </Button>
    </div>
  );
};

export { Online };
