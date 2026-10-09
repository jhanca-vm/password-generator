import { readFileSync } from 'node:fs'
import path from 'node:path'

import jetbrainsMonoBold from '@fonts/jetbrains-mono-latin-700-normal.woff2'
import clsx from 'clsx/lite'
import type { ReactNode } from 'react'

import fonts from './styles/fonts.css?inline'
import tailwind from './styles/tailwind.css?url'

interface Props {
  withIslands?: boolean
  children?: ReactNode
}

const scripts: string[] = JSON.parse(
  readFileSync(path.join(import.meta.dirname, 'manifest.json'), 'utf-8')
).entries['island-react'].initial.js

export default function RootLayout({ withIslands, children }: Props) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Generador de contraseñas</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          rel="preload"
          href={jetbrainsMonoBold}
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <style>{fonts}</style>
        <link rel="stylesheet" href={tailwind} />
        {withIslands &&
          scripts.map((src) => (
            <script type="module" src={src} key={src}></script>
          ))}
      </head>
      <body
        className={clsx(
          'bg-linear-to-r from-gray-900 to-gray-950 font-bold text-gray-200',
          'leading-tight sm:text-lg'
        )}
      >
        <main className="px-4 py-16">{children}</main>
      </body>
    </html>
  )
}
