import styles from './Header.module.scss';
import { Logo, Button, Link } from 'components';

const Header = () => {
  return (
    <>
      <div>
        <Logo />

      </div >
      <div>
        <div>
          <p>Поможем выбрать</p>
          <p>+375 29 113-67-97</p>
        </div>
        <div className={styles['vertical-line']}></div>
        <div>
          <Link
            path='/'
            fontFamily='Roboto-Bold'
            fontStyle='normal'
            fontWeight='700'
            fontSize='16px'
            lineHeight='19px'
            color='#5F6060'
          >
            Вход
          </Link>
          /
          <Link
            path='/'
            fontFamily='Roboto-Bold'
            fontStyle='normal'
            fontWeight='700'
            fontSize='16px'
            lineHeight='19px'
            color='#5F6060'
          >
            Регистрация
          </Link>
        </div>
        <Button marginLeft="34px">Добавить занятие</Button>
      </div>
    </>
  );
};

export { Header };
