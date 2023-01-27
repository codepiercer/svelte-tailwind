const config = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/@codepiercer/svelte-tailwind/**/*.svelte'
  ],

  safelist: [
    {
      pattern:
        /(text|bg|ring|border)-(red|green|blue|yellow|gray)-(50|100|200|300|400|500|600|700|800|900)/,
      variants: ['hover', 'focus', 'disabled']
    }
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif']
      }
    }
  },

  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
}

module.exports = config
