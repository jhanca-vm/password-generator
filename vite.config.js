import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import unocss from 'unocss/vite'
import extractorSvelte from '@unocss/extractor-svelte'

export default defineConfig({
  plugins: [unocss({ extractors: [extractorSvelte()] }), sveltekit()],
  server: { host: true, port: 3000 }
})
