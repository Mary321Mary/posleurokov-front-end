import styles from './Footer.module.scss';
import { Link, Button } from 'components';
const Footer = () => {
  const navItems = [
    {
      path: '#',
      text: 'ГЛАВНАЯ',
    },
    {
      path: '#',
      text: 'О ПРОЕКТЕ',
    },
    {
      path: '#',
      text: 'УСЛОВИЯ',
    },
    {
      path: '#',
      text: 'КОНТАКТЫ',
    },
    {
      path: '/qwe/qasd',
      text: 'ВОПРОСЫ И ОТВЕТЫ',
    },
  ];

  const navLittleItems = [
    {
      path: '#',
      text: 'Главная',
    },
    {
      path: '#',
      text: 'О проекте',
    },
    {
      path: '#',
      text: 'Условия',
    },
    {
      path: '#',
      text: 'Контакты',
    },
    {
      path: '/qwe/qasd',
      text: 'Вопросы и ответы',
    },
  ];

  const nav = navItems.map((item, i) => (
    <li key={item.text} className={styles['nav__item']}>
      <Link path={item.path}>{item.text}</Link>
      {i < navItems.length - 1 && <div className={styles['vertical-line']} />}
    </li>
  ));

  const navLittle = navLittleItems.map((item) => (
    <li key={item.text} className={styles['nav__item']}>
      <Link path={item.path}>{item.text}</Link>
    </li>
  ));
  return (
    <section className={styles.container}>
      <nav>
        <ul className={styles.nav}>
          {
            window.screen.width > 760 ? (
              nav
            ) : (
              navLittle
            )
          }
        </ul>
      </nav>
      <Button width="210px">ОСТАВИТЬ МЕСТО</Button>
    </section>
  );
};

export { Footer };
