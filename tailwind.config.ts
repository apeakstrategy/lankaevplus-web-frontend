import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // KineticEV App Theme - Cyan/Teal Accent
        primary: {
          50: '#E6FFFA',
          100: '#B2F5EA',
          200: '#81E6D9',
          300: '#4FD1C5',
          400: '#38B2AC',
          500: '#00D4AA', // KineticEV Cyan/Teal
          600: '#00B894',
          700: '#00997A',
          800: '#007A62',
          900: '#005C4A',
          950: '#003D31',
        },
        // Accent Cyan for highlights
        accent: {
          50: '#E0FFFF',
          100: '#B3FFFF',
          200: '#80FFFF',
          300: '#4DFFFF',
          400: '#1AFFFF',
          500: '#00E5E5', // Bright Cyan
          600: '#00B8B8',
          700: '#008A8A',
          800: '#005C5C',
          900: '#002E2E',
        },
        // Dark backgrounds - matching KineticEV app
        dark: {
          50: '#F7F7F8',
          100: '#ECECED',
          200: '#D9D9DB',
          300: '#A1A1A6',
          400: '#71717A',
          500: '#52525B',
          600: '#3F3F46',
          700: '#2A2A2E', // Card backgrounds
          800: '#1A1A1E', // Elevated surfaces
          900: '#121214', // Main background
          950: '#0A0A0C', // Deepest black
        },
        // Status colors matching the app
        status: {
          available: '#22C55E', // Green badge
          charging: '#00D4AA', // Teal charging
          offline: '#EF4444',
          maintenance: '#F59E0B',
        },
        // EV theme colors
        ev: {
          teal: '#00D4AA',
          cyan: '#00E5E5',
          glow: 'rgba(0, 212, 170, 0.5)',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Bebas Neue"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 212, 170, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 212, 170, 0.4)',
        'glow-teal': '0 0 30px rgba(0, 212, 170, 0.4)',
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 10px 15px -3px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
        'neon': '0 0 5px rgba(0, 212, 170, 0.5), 0 0 20px rgba(0, 212, 170, 0.3), 0 0 40px rgba(0, 212, 170, 0.2)',
        'inner-glow': 'inset 0 0 20px rgba(0, 212, 170, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dark': 'linear-gradient(135deg, #0A0A0C 0%, #121214 50%, #1A1A1E 100%)',
        'gradient-hero': 'linear-gradient(180deg, #0A0A0C 0%, #121214 50%, #0A0A0C 100%)',
        'gradient-teal': 'linear-gradient(135deg, #00D4AA 0%, #00E5E5 100%)',
        'gradient-card': 'linear-gradient(180deg, rgba(42,42,46,0.9) 0%, rgba(26,26,30,0.95) 100%)',
        'mesh-pattern': 'radial-gradient(circle at 1px 1px, rgba(0,212,170,0.03) 1px, transparent 0)',
        'grid-pattern': 'linear-gradient(rgba(0,212,170,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,0.03) 1px, transparent 1px)',
        'teal-glow': 'radial-gradient(ellipse at center, rgba(0,212,170,0.15) 0%, transparent 70%)',
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'count-up': 'countUp 2s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient': 'gradient 8s ease infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'scan-line': 'scanLine 3s linear infinite',
        'charge': 'charge 1.5s ease-in-out infinite',
        'pulse-teal': 'pulseTeal 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        countUp: {
          '0%': { transform: 'scale(0.8)' },
          '100%': { transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 170, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 212, 170, 0.6)' },
        },
        pulseTeal: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 212, 170, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(0, 212, 170, 0)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        charge: {
          '0%': { width: '0%' },
          '50%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
