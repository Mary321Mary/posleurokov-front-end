import React from "react";
import styles from "./Sheet.module.scss";

const Sheet = ({ children, className, ...rest }) => {
  return (
    <div className={`${styles.sheet} ${className}`} style={{ ...rest }}>
      {children}
    </div>
  );
};

export { Sheet };
