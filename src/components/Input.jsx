import React from 'react';

const Input = ({ name, value, onChange, isDate, warning }) => {
    return (
        <div className="mb-4">
            <input
                type={isDate ? 'date' : 'text'}
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full p-2 border border-gray-300 rounded focus:outline-none ${warning ? 'border-red-500' : ''} `}
                required
            />
        </div>
    );
};

export default Input;