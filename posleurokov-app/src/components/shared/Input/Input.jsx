import React from "react";
import styles from "./Input.module.scss";

const Input = ({
  type,
  required,
  label,
  name,
  step,
  placeholder,
  multiple,
  prepend = null,
  value,
  onChange,
  onKeyPress,
  errorMessage,
  ...rest
}) => {
  const inputType = type || "text";
  const cls = [styles.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  return (
    <div>
      <div
        className={`${cls.join(" ")} ${prepend !== null ? styles.padding : ""}`}
      >
        {label ? (
          <label htmlFor={htmlFor}>
            {required ? <span>* </span> : null}
            {label}
          </label>
        ) : null}
        <input
          style={{ ...rest }}
          type={inputType}
          name={name}
          step={step}
          multiple={multiple}
          id={htmlFor}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
        {prepend}
      </div>
      {errorMessage ? <span>{errorMessage}</span> : null}
    </div>
  );
};

export { Input };
