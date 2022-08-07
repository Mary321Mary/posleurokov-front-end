import React from "react";
const Select = props => {
    const htmlFor = `${props.label}-${Math.random()}`

    return (
        <select
            id={htmlFor}
            value={props.value}
            onChange={props.onChange}
        >
            {props.options.map((option, index) => {
                return (
                    <option
                        value={option.value}
                        key={option.value + index}
                    >
                        {option.text}
                    </option>
                )

            })}
        </select>

    )
}

export default Select