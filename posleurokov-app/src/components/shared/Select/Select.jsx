import React, { useState } from "react";
import styles from "./Select.module.scss";
import { Checkbox, Link } from "components";
import { useOutsideClick } from "hooks";

const Select = ({
  placeholder = null,
  value = null,
  options = [],
  append = null,
  prepend = null,
  checkbox = false,
  showValue = false,
  path = "#",
  onChange,
  zIndex,
  minWidth,
  selectWidth = "200px",
  ...rest
}) => {
  const [showOptionList, setShowOptionList] = useState(false);

  let checkboxList = checkbox && Array.isArray(value) ? value : [];

  const handleClick = (value) => {
    if (checkbox) {
      let updatedList = [...checkboxList];
      if (updatedList.includes(value)) {
        updatedList = updatedList.filter((item) => item !== value);
      } else {
        updatedList.push(value);
      }
      checkboxList = [...updatedList];
      onChange(checkboxList);
      return;
    }
    onChange(value);
    setShowOptionList(false);
  };
  const ref = useOutsideClick(() => setShowOptionList(false));

  return (
    <div
      ref={ref}
      className={`${styles["select"]} ${
        showOptionList ? styles["select--active"] : ""
      }`}
      style={{ zIndex: zIndex, minWidth: minWidth, width: selectWidth }}
    >
      <div
        className={styles["select__box"]}
        style={{ ...rest }}
        onClick={() => setShowOptionList(!showOptionList)}
        width={selectWidth}
      >
        {append && <div className={styles.append}>{append}</div>}
        <span className={styles["box__text"]}>
          {showValue
            ? checkboxList.length === 0
              ? placeholder
              : checkboxList
            : checkbox
            ? placeholder
            : value || placeholder}
        </span>
        {prepend && <div className={styles.prepend}>{prepend}</div>}
      </div>
      {showOptionList && (
        <ul className={styles["select__options"]}>
          {path === "#"
            ? options.map((option, i) => {
                return (
                  <li
                    className={styles["option"]}
                    key={`option-${option.value}-${i}`}
                    data-value={option.value}
                    onClick={
                      !checkbox ? () => handleClick(option.value) : undefined
                    }
                  >
                    {checkbox ? (
                      <Checkbox
                        text={option.text}
                        value={checkboxList.includes(option.value)}
                        onChange={() => handleClick(option.value)}
                      />
                    ) : (
                      option.text
                    )}
                  </li>
                );
              })
            : options.map((option, i) => {
                return (
                  <Link
                    path={
                      path +
                      `${option.value === "Все города" ? "" : option.value}`
                    }
                    color="#5f6060"
                    font-family="Roboto-Regular"
                    font-style="normal"
                    font-weight="400"
                    font-size="12px"
                    line-height="14px"
                    textDecoration="none"
                  >
                    <li
                      className={styles["link"]}
                      key={`option-${option.value}-${i}`}
                      data-value={option.value}
                      onClick={
                        !checkbox ? () => handleClick(option.value) : undefined
                      }
                    >
                      {checkbox ? (
                        <Checkbox
                          text={option.text}
                          value={checkboxList.includes(option.value)}
                          onChange={() => handleClick(option.value)}
                        />
                      ) : (
                        option.text
                      )}
                    </li>
                  </Link>
                );
              })}
        </ul>
      )}
    </div>
  );
};

export { Select };
