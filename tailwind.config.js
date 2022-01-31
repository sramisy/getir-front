module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    colors: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      white: 'var(--color-white)',
      black: 'var(--color-black)',
      gray: 'var(--color-gray)',
      'gray-storm': 'var(--color-gray-storm)',
      'gray-light': 'var(--color-gray-light)',
      'gray-mid': 'var(--color-gray-mid)',
      'gray-dark': 'var(--color-gray-dark)',
      'primary-light': 'var(--color-primary-light)',
      'gray-background': 'var(--color-gray-background)',
      'primary-background': 'var(--color-primary-background)',
      'input-border': 'var(--color-input-border)',
      'brand-yellow': 'var(--color-brand-yellow)',
      'facebook-blue': 'var(--color-facebook-blue)',
      success: 'var(--color-success)',
      danger: 'var(--color-danger)',
      transparent: 'transparent',
    },
    extend: {
      animation: {
        'spin-slow': 'spin 1.5s linear infinite',
      },
      spacing: {
        '15': '3.75rem',
        '25': '6.25rem',
        '30': '7.5rem',
        '100': '25rem',
      },
      margin: {
        '15': '3.75rem',
      },
      colors: {
        primary: 'var(--color-primary)',
      },
      outlineColor: {
        primary: 'var(--color-primary)',
      }
    },
    variants: {
      extend: {},
    },
    plugins: [],
    corePlugins: {
      container: false,
    }
  },
  plugins: [],
}