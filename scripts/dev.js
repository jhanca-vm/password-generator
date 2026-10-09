import { spawn } from 'node:child_process'

import { createRsbuild, loadConfig } from '@rsbuild/core'

const config = await loadConfig()
const rsbuild = await createRsbuild({ config })

rsbuild.onAfterDevCompile(({ isFirstCompile }) => {
  if (isFirstCompile) {
    spawn('node', ['--watch', '--watch-preserve-output', 'dist'], {
      stdio: 'inherit'
    })
  }
})

await rsbuild.createDevServer()
