import jetbrainsMonoBold from '@fonts/jetbrains-mono-latin-700-normal.woff2'
import clsx from 'clsx/lite'
import { renderToString } from 'react-dom/server'
import Form from './components/form'

export default function Page() {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>Generador de contraseñas</title>
        <meta
          name="description"
          content="Genera contraseñas seguras para proteger tus cuentas."
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          rel="preload"
          href={jetbrainsMonoBold}
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
      </head>
      <body
        className={clsx(
          'min-h-dvh flex flex-col bg-linear-to-r from-gray-900 to-gray-950',
          'font-bold text-gray-200 leading-tight sm:text-lg'
        )}
      >
        <main className="my-auto px-4 py-16">
          <h1 className="text-center leading-none text-gray-500 sm:text-2xl">
            Generador de contraseñas
          </h1>
          <island-react
            dangerouslySetInnerHTML={{ __html: renderToString(<Form />) }}
          ></island-react>
        </main>
      </body>
    </html>
  )
}
