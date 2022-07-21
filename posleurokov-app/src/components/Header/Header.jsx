import styles from './Header.module.scss';
import { Logo, Button } from 'components';
const Header = () => {
  return (
    <>
      <div>
        <Logo />
        <span>Choose city component</span>
      </div>
      <div>
        <span>Call</span>
        <div className={styles['vertical-line']}></div>
        <span>Auth</span>
        <Button marginLeft="34px">Добавить занятие</Button>
      </div>
    </>
  );
};

export { Header };
