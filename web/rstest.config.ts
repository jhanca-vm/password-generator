import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSvgr } from '@rsbuild/plugin-svgr'
import { defineConfig } from '@rstest/core'

export default defineConfig({
  setupFiles: ['./rstest.setup.ts'],
  testEnvironment: 'happy-dom',
  reporters: 'verbose',
  plugins: [
    pluginReact({ reactCompiler: true }),
    pluginSvgr({ svgrOptions: { exportType: 'default' } })
  ]
})
