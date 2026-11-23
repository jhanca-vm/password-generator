import { createRequire } from 'node:module'
import { createContext, Script } from 'node:vm'
import { type RsbuildPlugin, type Rspack, rspack } from '@rsbuild/core'
import { renderToStaticMarkup } from 'react-dom/server'

const require = createRequire(import.meta.url)
const context = createContext({ require, exports: {} })

let webCompiler: Rspack.Compiler

export const pluginJsx = (): RsbuildPlugin => ({
  name: 'rsbuild:jsx',
  setup(api) {
    api.onAfterCreateCompiler(({ compiler }) => {
      const { compilers } = compiler as Rspack.MultiCompiler

      webCompiler = compilers[1]
    })

    api.processAssets({ stage: 'optimize' }, ({ assets, compilation }) => {
      const filename = 'index.js'
      const script = new Script(assets[filename].source() as string)

      script.runInContext(context)

      const html = renderToStaticMarkup(context.exports.default())
      const htmlPlugin = new rspack.HtmlRspackPlugin({
        templateContent: `<!doctype html>${html}`
      })

      htmlPlugin.apply(webCompiler)
      compilation.deleteAsset(filename)
    })
  }
})
