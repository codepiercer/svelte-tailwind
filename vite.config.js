import { sveltekit } from "@sveltejs/kit/vite"

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  define: {
    "import.meta.env.BUILD_TIME": JSON.stringify(new Date().toISOString()),
    "import.meta.env.BUILD_VERSION": JSON.stringify(process.env.npm_package_version)
  },
  server: {
    port: process.env.PORT
  }
}

export default config
