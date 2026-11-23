import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSvgr } from '@rsbuild/plugin-svgr'
import { pluginTailwindcss } from '@rsbuild/plugin-tailwindcss'
import { pluginJsx } from './plugins/jsx'

export default defineConfig({
  plugins: [pluginSvgr({ svgrOptions: { exportType: 'default' } })],
  environments: {
    node: {
      plugins: [
        pluginJsx(),
        pluginReact({ swcReactOptions: { development: false } })
      ],
      source: { entry: { index: './src/page.tsx' } },
      output: { autoExternal: true, module: false, target: 'node' },
      tools: { rspack: { output: { library: { type: 'commonjs-static' } } } }
    },
    web: {
      plugins: [pluginReact({ reactCompiler: true }), pluginTailwindcss()],
      source: { entry: { main: './src/main.tsx' } },
      tools: { htmlPlugin: false, rspack: { dependencies: ['node'] } }
    }
  },
  dev: {
    hmr: false,
    watchFiles: { paths: ['plugins', 'src'], type: 'restart' }
  },
  output: { cleanDistPath: true, distPath: { root: '../api/dist' } }
})
