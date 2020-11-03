module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    './public/**/*.html',
    './src/**/*.vue',
  ],
  theme: {
    extend: {
      spacing: {
        '1/2': '50vh',
        '9/12': '75vh'
      }
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/custom-forms'),
  ],
}
