import styles from './Footer.module.scss';
import { Link, Button } from 'components';
const Footer = () => {
  const navItems = [
    {
      path: '/',
      text: 'Главная',
    },
    {
      path: '/about',
      text: 'О проекте',
    },
    {
      path: '/terms',
      text: 'Условия',
    },
    {
      path: '/contacts',
      text: 'Контакты',
    },
    {
      path: '/faq',
      text: 'Вопросы и ответы',
    },
  ];

  const nav = navItems.map((item, i) => (
    <li key={item.text} className={styles['nav__item']}>
      <Link path={item.path}>{item.text}</Link>
      {i < navItems.length - 1 && <div className={styles['vertical-line']} />}
    </li>
  ));

  return (
    <section className={styles.container}>
      <nav>
        <ul className={styles.nav}>
          {nav}
        </ul>
      </nav>
      <Button width="210px">ОСТАВИТЬ МЕСТО</Button>
    </section>
  );
};

export { Footer };
