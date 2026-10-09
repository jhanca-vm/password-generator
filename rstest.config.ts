import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSvgr } from '@rsbuild/plugin-svgr'
import { defineConfig } from '@rstest/core'

export default defineConfig({
  projects: [
    { name: 'core', include: ['src/core/**/*.test.ts'] },
    {
      name: 'ui',
      include: ['src/ui/**/*.test.{ts,tsx}'],
      setupFiles: ['./rstest.setup.ts'],
      testEnvironment: 'happy-dom',
      plugins: [
        pluginReact({ reactCompiler: true }),
        pluginSvgr({ svgrOptions: { exportType: 'default' } })
      ]
    }
  ]
})
