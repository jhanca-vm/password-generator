import { renderToString } from 'react-dom/server'

import PasswordForm from '@/ui/islands/password-form'
import RootLayout from '@/ui/layout'

export default function HomePage() {
  return (
    <RootLayout withIslands>
      <h1 className="text-center leading-none text-gray-500 sm:text-2xl">
        Generador de contraseñas
      </h1>
      <island-react
        data-name="password-form"
        dangerouslySetInnerHTML={{ __html: renderToString(<PasswordForm />) }}
      />
    </RootLayout>
  )
}
