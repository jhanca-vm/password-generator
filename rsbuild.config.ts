import path from 'node:path'

import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSvgr } from '@rsbuild/plugin-svgr'
import { pluginTailwindcss } from '@rsbuild/plugin-tailwindcss'

const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [
    pluginReact({ reactCompiler: true }),
    pluginSvgr({ svgrOptions: { exportType: 'default' } })
  ],
  environments: {
    node: {
      plugins: [pluginTailwindcss()],
      output: {
        autoExternal: true,
        copy: [{ from: './src/ui/favicon.svg' }],
        filenameHash: isProd,
        filename: {
          css({ chunk }) {
            const name = chunk?.name ? path.basename(chunk.name) : ''
            return `${name}${isProd ? '.[contenthash:10]' : ''}.css`
          }
        },
        target: 'node'
      },
      tools: {
        cssLoader: { esModule: false },
        lightningcssLoader: { minify: isProd }
      }
    },
    web: {
      source: { entry: { 'island-react': './src/ui/islands/index.tsx' } },
      output: { manifest: true, module: true },
      tools: { htmlPlugin: false }
    }
  },
  dev: { hmr: false, liveReload: false, writeToDisk: true },
  server: { printUrls: false }
})
