import styles from "./Link.module.scss";
import { Link as RouterLink } from "react-router-dom";

const Link = ({ path = "#", target = "_self", onClick, children, ...rest }) => {
  return (
    <RouterLink
      className={styles.link}
      to={path}
      target={target}
      onClick={onClick}
      style={{ ...rest }}
    >
      {children}
    </RouterLink>
  );
};

export { Link };
