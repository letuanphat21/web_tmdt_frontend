/** @type {import('tailwindcss').Config} */
export default {
    // 1. Phải có cái này để Tailwind quét code trong các file .tsx
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            // 2. Thêm mã màu tùy chỉnh để giống y hệt thiết kế
            colors: {
                olive: {
                    300: '#a3b18a',
                    800: '#586b4e', // Màu xanh rêu của nút
                    900: '#46563e', // Màu xanh rêu khi di chuột vào (hover)
                }
            },
            fontFamily: {
                sans: ['Manrope', 'sans-serif'],
            },
        },
    },
    plugins: [],
}