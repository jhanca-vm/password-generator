import { expect, it, rs } from '@rstest/core'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import PasswordForm from './password-form'

rs.mock('../lib/trpc/client', () => ({
  default: {
    password: {
      generate: {
        mutate: rs.fn().mockResolvedValue({ ok: true, data: 'P4$5W0rD!' })
      }
    }
  }
}))

it('shows feedback after copying password', async () => {
  render(<PasswordForm />)

  fireEvent.click(screen.getByRole('button', { name: 'Generar' }))

  await waitFor(() => expect(screen.getByText('P4$5W0rD!')).toBeInTheDocument())

  fireEvent.click(screen.getByRole('button', { name: 'Copiar' }))

  await waitFor(() => expect(screen.getByText('Copiado')).toBeInTheDocument())
})

it('clears password when rules change', async () => {
  render(<PasswordForm />)

  async function generatePassword() {
    fireEvent.click(screen.getByRole('button', { name: 'Generar' }))

    await waitFor(() => {
      expect(screen.getByText('P4$5W0rD!')).toBeInTheDocument()
    })
  }

  await generatePassword()

  fireEvent.change(screen.getByRole('slider'), { target: { value: '20' } })

  expect(screen.queryByText('P4$5W0rD!')).not.toBeInTheDocument()

  await generatePassword()

  fireEvent.click(screen.getByRole('checkbox', { name: 'Incluir símbolos' }))

  expect(screen.queryByText('P4$5W0rD!')).not.toBeInTheDocument()
})

it('shows correct security level based on selected rules', () => {
  render(<PasswordForm />)

  const meter = screen.getByRole('status', { name: 'Seguridad' })

  expect(meter).toHaveValue('Fuerte')

  fireEvent.change(screen.getByRole('slider'), { target: { value: '8' } })

  expect(meter).toHaveValue('Media')

  fireEvent.click(screen.getByRole('checkbox', { name: 'Incluir símbolos' }))

  expect(meter).toHaveValue('Débil')

  fireEvent.click(screen.getByRole('checkbox', { name: 'Incluir números' }))

  expect(meter).toHaveValue('Muy débil')

  fireEvent.click(screen.getByRole('checkbox', { name: 'Incluir minúsculas' }))

  expect(meter).toHaveValue('Muy débil')

  fireEvent.click(screen.getByRole('checkbox', { name: 'Incluir mayúsculas' }))

  expect(meter).toHaveValue('')
})

it('disables generate button when no character types are selected', () => {
  render(<PasswordForm />)

  fireEvent.click(screen.getByRole('checkbox', { name: 'Incluir mayúsculas' }))
  fireEvent.click(screen.getByRole('checkbox', { name: 'Incluir minúsculas' }))
  fireEvent.click(screen.getByRole('checkbox', { name: 'Incluir números' }))
  fireEvent.click(screen.getByRole('checkbox', { name: 'Incluir símbolos' }))

  expect(screen.getByRole('button', { name: 'Generar' })).toBeDisabled()
})
