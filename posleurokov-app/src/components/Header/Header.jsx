import styles from './Header.module.scss';
import { useState } from 'react';
import { Logo, Button, Link, Sheet, Select } from 'components';
import { useOutsideClick } from 'hooks';
import galochka from 'assets/img/galochka.png'
import tel from 'assets/img/teleph.svg'
import menu from 'assets/img/Menu.svg'

const Header = () => {

  const [city, setCity] = useState('Гомель');
  const PHONE = '+375 29 113-67-97';

  const openNav = () => {
    if (window.screen.width < 760) {
      document.getElementById('menu').style.width = '250px';
    }
  }

  const closeNav = () => {
    if (window.screen.width < 760) {
      document.getElementById('menu').style.width = '0';
    }
  }

  const ref = useOutsideClick(closeNav);

  return (
    <>
      <div ref={ref}>
        <Logo />
        <Select
          value={city}
          options={[
            { text: 'Гомель', value: 'Гомель' },
            { text: 'Минск', value: 'Минск' },
            { text: 'Гродно', value: 'Гродно' },
            { text: 'Витебск', value: 'Витебск' },
            { text: 'Брест', value: 'Брест' },
            { text: 'Могилёв', value: 'Могилёв' },
          ]}
          prepend={<img src={galochka} height="8px" alt="галочка" />}
          textDecoration="underline"
          textDecorationStyle="dashed"
          textUnderlineOffset="5px"
          onChange={(value) => setCity(value)}
        />
      </div>
          <div className={styles.tablet}>
            <Sheet
              display="flex"
              alignItems="center"
              padding="10px"
            >
              <img src={tel} alt="Телефон" style={{marginRight:'15.08px'}}/>
              <div>
                <div style={{
                  fontFamily: 'Roboto-Medium',
                  fontWeight: '500',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#9E9E9E'
                }}>Поможем выбрать</div>
                <div style={{
                  fontFamily: 'Roboto-Medium',
                  fontWeight: '500',
                  fontSize: '16px',
                  lineHeight: '19px',
                  color: '#5F6060'
                }}>{PHONE}</div>
              </div>
            </Sheet>
            <div className={styles['vertical-line']}></div>
            <div>
              <Link
                path="/"
                fontFamily="Roboto-Bold"
                fontWeight="700"
                fontSize="16px"
                lineHeight="19px"
                color="#5F6060"
                marginRight="10px"
              >
                Вход
              </Link>
              /
              <Link
                path="/"
                fontFamily="Roboto-Bold"
                fontWeight="700"
                fontSize="16px"
                lineHeight="19px"
                color="#5F6060"
                marginLeft="10px"
              >
                Регистрация
              </Link>
            </div>
            <div className={styles.button}>
              <Button>Добавить занятие</Button>
            </div>
          </div>
          <div className={styles.mobile}>
            <img src={menu} alt="menu" onClick={() => openNav()} className={styles.navImage}/>
            <div className={styles.menu} id="menu">
              <a className={styles.closebtn} onClick={() => closeNav()}>&times;</a>
              <div>
                <Link
                  path="/"
                  fontFamily="Roboto-Bold"
                  fontWeight="700"
                  fontSize="16px"
                  lineHeight="19px"
                  color="#5F6060"
                >
                  Вход
                </Link>
                <Link
                  path="/"
                  fontFamily="Roboto-Bold"
                  fontWeight="700"
                  fontSize="16px"
                  lineHeight="19px"
                  color="#5F6060"
                >
                  Регистрация
                </Link>
              </div>
              <Button marginLeft="34px">Добавить занятие</Button>
            </div>
          </div>
    </>
  );
};

export { Header };
