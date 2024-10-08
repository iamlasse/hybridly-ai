import { type Config } from 'tailwindcss'

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: [ "class" ],
	content: [
		'./resources/**/*.{js,ts,vue,blade.php}',
	],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontSize: {
                xxs: '10px'
            },
            borderWidth: {
                6: '6px',
            },
            keyframes: {
                "accordion-down": {
                    from: { height: '0' },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: '0' },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
	},
	plugins: [
        require( '@tailwindcss/forms' ),
        require( "tailwindcss-animate" )
	],
} satisfies Config
