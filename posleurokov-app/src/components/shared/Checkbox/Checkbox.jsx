import styles from './Checkbox.module.scss';

const Checkbox = ({ text, value = false, onChange }) => {
  return (
    <label className={styles.wrapper}>
      <input
        className={styles.checkbox}
        type="checkbox"
        onChange={() => {
          onChange(!value);
        }}
      />
      <span
        className={`${styles.checkbox} ${
          value ? styles['checkbox--active'] : ''
        }`}
        aria-hidden="true"
      >
        <span className={styles.square} />
      </span>
      <span
        className={`${styles['checkbox-text']} ${
          value ? styles['checkbox-text--active'] : ''
        }`}
      >
        {text}
      </span>
    </label>
  );
};

export { Checkbox };
