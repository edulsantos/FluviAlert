export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:       '#0a0f1e',
          sidebar:  '#0d1526',
          card:     '#111c33',
          border:   '#1e2d4a',
          primary:  '#3b82f6',
          cyan:     '#06b6d4',
          critical: '#c0392b',
          warning:  '#e67e22',
          safe:     '#10b981',
          text:     '#e2e8f0',
          muted:    '#64748b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
