/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        afrimed: {
          navy: '#0B1E3D',
          navyLight: '#0F2340',
          green: '#16A34A',
        },
      },
      boxShadow: {
        // Ombres à double couche pour une profondeur douce, plus crédible qu'une
        // simple ombre plate — évite le rendu "généré par IA" typique.
        soft: '0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.05)',
        card: '0 2px 4px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.08)',
        elevated: '0 4px 8px rgba(15, 23, 42, 0.06), 0 16px 40px rgba(15, 23, 42, 0.12)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
