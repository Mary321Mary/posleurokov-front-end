import React from 'react';
import './Button.css';

function Button({type, children, onclick}) {
    return (
        <button className={type} onClick={onclick}>{children}</button>
    );
}

export default Button;
