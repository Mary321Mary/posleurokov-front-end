import React from 'react';
import styles from './Button.module.css';

function Button({type = 'button', children, onClick, ...rest}) {
    return (
        <button
            className={styles.button}
            type={type}
            onClick={onClick}
            style={{...rest}}
        >{children}</button>
    );
}

export default Button;
