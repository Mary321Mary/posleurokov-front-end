import styles from './Header.module.scss';
import { Logo, Button, Link } from 'components';
import Select from '../shared/Select/Select'
const Header = () => {
  return (
    <>
      <div>
        <Logo />
        <Select
          options={[
            { text: 'Гомель', value: 1 },
            { text: 'Минск', value: 2 },
            { text: 'Гродно', value: 3 },
            { text: 'Витебск', value: 4 },
            { text: 'Брест', value: 5 },
            { text: 'Могилёв', value: 6 },
          ]}
        />
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
            marginRight='10px'
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
            marginLeft='10px'
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
