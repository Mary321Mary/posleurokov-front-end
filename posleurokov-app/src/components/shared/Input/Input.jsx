import React from 'react';
import classes from '../Input/Input.module.scss';
import styles from '../Input/Input.module.scss'

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}

const Input = ({
  placeholder = null,
  prepend = null,
  onChange,
  type,
  ...rest
}) => {
  const inputType = type || 'text';
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  return (
    <div
      className={styles['input']}
      style={{ ...rest }}

    >
      <input className={styles['text']}
        placeholder={placeholder}
      />
      {prepend}

    </div>

  );
};

export { Input };
