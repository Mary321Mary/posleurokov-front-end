import styles from './Online.module.scss';
import {
  Button
} from '../shared';

const Online = ({ number, ...rest }) => {
  return (
    <div className={styles.online} style={{ ...rest }}>
      <div>
        <div className={styles.label}>Каталог кружков, секций и курсов онлайн</div>
        <div className={styles.count}>Найдено: {number}</div>
      </div>
      <Button
        border="1.5px solid #FFFFFF"
        backgroundColor="transparent"
      >Открыть</Button>
    </div>
  );
};

export { Online };