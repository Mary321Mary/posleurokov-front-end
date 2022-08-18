import styles from './Checkbox.module.scss';

const Checkbox = ({ text, value = false, onChange, ...rest }) => {
  return (
    <label className={styles.wrapper}>
      <input
        className={styles.checkbox}
        style={{ ...rest }}
        type="checkbox"
        onChange={() => {
          onChange(!value);

        }}

      />
      <span
        className={`${styles.checkbox} ${value ? styles['checkbox--active'] : ''
          }`}
        aria-hidden="true"
        style={{ ...rest }}

      >
        <span className={styles.square} />
      </span>
      <span
        className={`${styles['checkbox-text']} ${value ? styles['checkbox-text--active'] : ''
          }`}
      >
        {text}
      </span>
    </label>
  );
};

export { Checkbox };
