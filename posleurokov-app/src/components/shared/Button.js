import React from 'react';
import './Button.module.css';

function Button({type = 'button', children, onClick, ...rest}) {
    return (
        <button
            type={type}
            onClick={onClick}
            style={{...rest}}
        >{children}</button>
    );
}

export default Button;
