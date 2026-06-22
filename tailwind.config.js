const brandColor = (name) => `rgb(var(--brand-${name}) / <alpha-value>)`

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:       brandColor('bg'),
          sidebar:  brandColor('sidebar'),
          card:     brandColor('card'),
          border:   brandColor('border'),
          primary:  brandColor('primary'),
          cyan:     brandColor('cyan'),
          critical: brandColor('critical'),
          warning:  brandColor('warning'),
          safe:     brandColor('safe'),
          text:     brandColor('text'),
          muted:    brandColor('muted'),
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
