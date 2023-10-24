/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/components/**/*.{js,ts,jsx,tsx}', './src/views/**/*.{js,ts,jsx,tsx}', "./src/**/*.{js,jsx,ts,tsx}"],
    purge: {
        options: {
            safelist: [
                'bg-blue-500',
                'hover:bg-blue-700',
                'bg-red-500',
                'hover:bg-red-700',
                'bg-green-500',
                'hover:bg-green-700',
                'bg-gray-500',
                'hover:bg-gray-700',
                'bg-cream-500',
                'cursor-pointer',
                'cursor-not-allowed'
                ,
            ],
        },
    },
    theme: {
        extend: {},
    },
    plugins: [],
};

