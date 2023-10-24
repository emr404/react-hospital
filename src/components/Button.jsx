import React from 'react';

const Button = ({ clickAction, title, colour, className, isDisabled, tooltip }) => {
    return (
        <button
            className={`has-tooltip bg-${colour}-500 hover:bg-${colour}-700 cursor-pointer text-white font-bold py-2 px-4 rounded mr-2 ${className}`}
            onClick={clickAction}
            disabled={isDisabled}
            title={title}
        >
            {tooltip ? (
                <span className="tooltip rounded bg-opacity-50 shadow-lg p-1 bg-black text-white -mt-8 -ml-8 font-light">
                    {tooltip}
                </span>
            ) : null}
            {title}
        </button>
    );
};

export default Button;