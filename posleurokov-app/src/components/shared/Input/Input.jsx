import React from "react";
import styles from "./Input.module.scss";

const Input = ({
  type,
  required,
  label,
  name,
  step,
  multiple,
  value,
  onChange,
  errorMessage,
  ...rest
}) => {
  const inputType = type || "text";
  const cls = [styles.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  return (
    <div className={cls.join(" ")}>
      <label htmlFor={htmlFor}>
        {required ? <span>* </span> : null}
        {label}
      </label>
      <input
        style={{ ...rest }}
        type={inputType}
        name={name}
        step={step}
        multiple={multiple}
        id={htmlFor}
        value={value}
        onChange={onChange}
      />
      <br />
      <span>{errorMessage}</span>
    </div>
  );
};

export { Input };
