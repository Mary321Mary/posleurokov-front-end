import styles from './Link.module.scss';

const Link = ({ path = '#', target = '_self', children, ...rest }) => {
  return (
    <a className={styles.link} href={path} target={target} style={{ ...rest }}>
      {children}
    </a>
  );
};

export { Link };
