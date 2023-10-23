import React from 'react';

const Button = ({ clickAction, title, colour, className, isDisabled }) => {
    return (
        <button
            style={{ cursor: 'focus' }}
            className={`bg-${colour}-500 hover:bg-${colour}-700 cursor-pointer text-white font-bold py-2 px-4 rounded mr-2 ${className}`}
            onClick={clickAction}
            disabled={isDisabled}
        >
            {title}
        </button>
    );
};

export default Button;