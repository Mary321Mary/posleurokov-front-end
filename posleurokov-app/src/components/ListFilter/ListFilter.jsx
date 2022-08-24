import React, { useState } from 'react';
import styles from './ListFilter.module.scss';
import { Checkbox } from 'components';

const ListFilter = ({
    placeholder = null,
    value = null,
    options = [],
    append = null,
    prepend = null,
    checkbox = false,
    onChange,
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

    return (
        <div
            className={`${styles['select']} ${showOptionList ? styles['select--active'] : ''
                }`}
        >
            <ul>
                {options.map((option, i) => {
                    return (
                        <li
                            className={styles['option']}
                            key={`option-${option.value}-${i}`}
                            data-value={option.value}
                            onClick={
                                !checkbox ? () => handleClick(option.value) : undefined
                            }
                        >
                            {checkbox ? (
                                <Checkbox
                                    border="0.5px #a9a9a9 solid"
                                    text={option.text}
                                    value={checkboxList.includes(option.value)}
                                    onChange={() => handleClick(option.value)}
                                />
                            ) : (
                                option.text
                            )}
                        </li>
                    );
                })}
            </ul>

        </div>
        // <select className={styles.select} value={value} onChange={onChange}>
        //   {options.map((option, index) => {
        //     return (
        //       <option value={option.value} key={option.value + index}>
        //         {option.text}
        //       </option>
        //     );
        //   })}
        // </select>
    );
};

export { ListFilter };
