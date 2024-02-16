/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [
        require('./tailwind/tailwnid-plugin-debug-styles'),
        require('./tailwind/tailwind-plugin-debug-screens'),
        require('./tailwind/tailwind-plugin-data-state'),
        require('./tailwind/tailwind-plugin-shadcn'),
        require('./tailwind/tailwind-plugin-shadcn-feedback'),
        require('./tailwind/tailwindcss-animate'),
        require('tailwindcss-radix')(),
    ],
};
