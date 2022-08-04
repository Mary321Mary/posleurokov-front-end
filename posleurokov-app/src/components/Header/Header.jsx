import styles from './Header.module.scss';
import { useEffect } from 'react';
import { Logo, Button, Link } from 'components';
import { Sheet } from 'components/shared'
import tel from 'assets/img/teleph.svg'
import menu from 'assets/img/Menu.svg'

const Header = () => {
  useEffect(() => {
    if (window.screen.width < 760) {
      const handleClick = () => {
        if(document.getElementById('menu').style.width != '0') {
          document.getElementById('menu').style.width = '0';
        }
      };
      const element = document.getElementsByTagName('main');
      console.log(element);
      element[0].addEventListener('click', handleClick);
      return () => {
        element[0].removeEventListener('click', handleClick);
      };
    }
  }, []);

  const openNav = () => {
    document.getElementById('menu').style.width = '250px';
  }

  const closeNav = () => {
    document.getElementById('menu').style.width = '0';
  }

  return (
    <>
      <div>
        <Logo />
        <select>
          <option value="gomel">Гомель</option>
        </select>
      </div>
          <div className={styles.tablet}>
            <Sheet
              display='flex'
              alignItems='center'
              padding='10px'
            >
              <img src={tel} alt='Телефон' style={{marginRight:'15.08px'}}/>
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
                }}>+375 29 113-67-97</div>
              </div>
            </Sheet>
            <div className={styles['vertical-line']}></div>
            <div>
              <Link
                path='/'
                fontFamily='Roboto-Bold'
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
                fontWeight='700'
                fontSize='16px'
                lineHeight='19px'
                color='#5F6060'
                marginLeft='10px'
              >
                Регистрация
              </Link>
            </div>
            <div className={styles.button}>
              <Button>Добавить занятие</Button>
            </div>
          </div>
          <div className={styles.mobile}>
            <img src={menu} alt='menu' onClick={() => openNav()} className={styles.navImage}/>
            <div className={styles.menu}>
              <a className={styles.closebtn} onClick={() => closeNav()}>&times;</a>
              <div>
                <Link
                  path='/'
                  fontFamily='Roboto-Bold'
                  fontWeight='700'
                  fontSize='16px'
                  lineHeight='19px'
                  color='#5F6060'
                >
                  Вход
                </Link>
                <Link
                  path='/'
                  fontFamily='Roboto-Bold'
                  fontWeight='700'
                  fontSize='16px'
                  lineHeight='19px'
                  color='#5F6060'
                >
                  Регистрация
                </Link>
              </div>
              <Button marginLeft='34px'>Добавить занятие</Button>
            </div>
          </div>
    </>
  );
};

export { Header };
