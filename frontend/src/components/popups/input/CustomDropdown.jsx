import React from 'react';
import {ReactComponent as SelectChevron} from '../../../icons/chevron.svg';
import '../AddDataModal.css';

const CustomDropdown = ({
    label,
    value,
    onChange,
    options,
    className = '',
    ...props
}) => {
    return (
        <div className={`form-row dropdown-row ${className}`}>
            <label className="form-label dropdown-label">
                {label}
            </label>
            <div className="select-wrapper">
                <select
                    value={value}
                    onChange={onChange}
                    className="form-select"
                    {...props}
                >
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="select-chevron">
                    <SelectChevron className="select-chevron" />
                </div>
            </div>
        </div>
    );
};

export default CustomDropdown;