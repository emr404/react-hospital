import React from 'react';

const Card = ({ title, children }) => {
    return (
        <div className="fixed z-10 inset-0 flex items-center justify-center overflow-auto">
            <div className="relative bg-white w-full max-w-md p-6 rounded-lg shadow-xl border border-solid">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                {children}
            </div>
        </div>
    );
};
export default Card;