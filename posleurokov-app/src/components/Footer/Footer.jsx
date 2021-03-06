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

  const nav = navItems.map((item, i) => (
    <li key={item.text} className={styles['nav__item']}>
      <Link path={item.path}>{item.text}</Link>
      {i < navItems.length - 1 && <div className={styles['vertical-line']} />}
    </li>
  ));
  return (
    <section className={styles.container}>
      <nav>
        <ul>{nav}</ul>
      </nav>
      <Button width="210px">ОСТАВИТЬ МЕСТО</Button>
    </section>
  );
};

export { Footer };
