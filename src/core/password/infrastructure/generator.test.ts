import { expect, it } from '@rstest/core'

import { PASSWORD_LENGTH } from '../domain/constants'
import passwordGenerator from './generator'

const password = passwordGenerator.generate({
  length: PASSWORD_LENGTH.MIN,
  includesUppercase: true,
  includesLowercase: true,
  includesNumbers: true,
  includesSymbols: true
})

it('should generate password with correct length', () => {
  expect(password).toHaveLength(PASSWORD_LENGTH.MIN)
})

it('should include at least one character of each selected type', () => {
  expect(password).toMatch(/[A-Z]/)
  expect(password).toMatch(/[a-z]/)
  expect(password).toMatch(/[0-9]/)
  expect(password).toMatch(/[!@#$%^&*()_+-=[\]{}|;:,.<>?/"\\~]/)
})
