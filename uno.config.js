import {
  defineConfig,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  content: { filesystem: ['src/app.html'] },
  theme: {
    colors: {
      default: {
        100: '#e6e5ea',
        200: '#817d92',
        300: '#24232c',
        400: '#18171f'
      },
      primary: '#a4ffaf',
      secondary: '#fb7c58',
      warning: '#f8cd65',
      danger: '#f64a4a'
    }
  },
  transformers: [transformerDirectives(), transformerVariantGroup()]
})
