import React from 'react';
import classes from '../Input/Input.module.scss';
import styles from '../Input/Input.module.scss'

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}

const Input = (props) => {
  const inputType = props.type || 'text';
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) {
    cls.push(classes.invalid);
  }

  return (
    <div
      className={styles['input']}
    >
      <input className={styles['text']}
        placeholder={props.placeholder}
      />
      {props.prepend}

    </div>

  );
};

export { Input };
