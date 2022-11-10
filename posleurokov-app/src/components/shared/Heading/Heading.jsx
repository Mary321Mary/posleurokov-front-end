import React from "react";
import styles from "./Heading.module.scss";

const Heading = ({
  tag,
  center = false,
  children,
  className = "",
  ...rest
}) => {
  const Tag = tag;
  return (
    <Tag
      className={`${styles[Tag]} ${center ? styles.center : ""} ${className}`}
      style={{ ...rest }}
    >
      {children}
    </Tag>
  );
};

export { Heading };
