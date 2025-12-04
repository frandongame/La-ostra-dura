/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                dorado: '#E4C525',
                rojo: '#C70735',
                azulMarino: '#1545FD',
                azulTurquesa: '#B6FFFF',
                negro: '#282828',
                fondo: '#0B0F19',
            },
            animation: {
                'wave': 'wave 3s ease-in-out infinite',
                'bubble': 'bubble linear forwards',
                'swim': 'swim 2s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite',
                'float': 'float 3s ease-in-out infinite',
                'twinkle': 'twinkle 2s ease-in-out infinite',
                'slide-in-right': 'slide-in-right 0.3s ease-out',
                'progress': 'progress linear forwards',
                'gradient': 'gradient 3s ease infinite',
                'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
                'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
                'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                gradient: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                shake: {
                    '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
                    '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
                    '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
                    '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
                },
                wave: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '50%': { transform: 'translateX(-10px)' },
                },
                bubble: {
                    '0%': {
                        transform: 'translateY(0) scale(1)',
                        opacity: '0.4'
                    },
                    '100%': {
                        transform: 'translateY(-100vh) scale(1.5)',
                        opacity: '0'
                    }
                },
                swim: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' }
                },
                glow: {
                    '0%, 100%': { textShadow: '0 0 10px #E4C525' },
                    '50%': { textShadow: '0 0 20px #E4C525, 0 0 30px #E4C525' }
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' }
                },
                twinkle: {
                    '0%, 100%': { opacity: '0.2' },
                    '50%': { opacity: '1' }
                },
                'slide-in-right': {
                    'from': { transform: 'translateX(100%)', opacity: '0' },
                    'to': { transform: 'translateX(0)', opacity: '1' }
                },
                progress: {
                    'from': { width: '100%' },
                    'to': { width: '0%' }
                }
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
}
