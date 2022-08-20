import React from "react";
import styles from "../Input/Input.module.scss";

const Input = ({
  placeholder = null,
  prepend = null,
  onChange,
  type,
  ...rest
}) => {
  const inputType = type || "text";
  const cls = [styles.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  return (
    <div className={styles["input"]} style={{ ...rest }}>
      <input className={styles["text"]} placeholder={placeholder} />
      {prepend}
    </div>
  );
};

export { Input };
