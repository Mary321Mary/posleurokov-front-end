import styles from "./Link.module.scss";

const Link = ({
  path = "#",
  target = "_self",
  onClick,
  children,
  className,
  ...rest
}) => {
  return (
    <a
      className={`${styles.link} ${className}`}
      href={path}
      target={target}
      onClick={onClick}
      style={{ ...rest }}
    >
      {children}
    </a>
  );
};

export { Link };
