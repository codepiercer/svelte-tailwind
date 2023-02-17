const config = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/@codepiercer/svelte-tailwind/**/*.svelte'
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
