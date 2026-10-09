import { expect, it, rs } from '@rstest/core'

import type { PasswordRules } from '../domain/types'
import generatePassword, { type PasswordGenerator } from './generate'

const generator: PasswordGenerator = {
  generate: rs.fn().mockReturnValue('P4$5W0rD!')
}

const rules: PasswordRules = {
  length: 3,
  includesUppercase: false,
  includesLowercase: false,
  includesNumbers: false,
  includesSymbols: false
}

it('should return error when length is out of bounds', () => {
  const expected = { ok: false, error: 'invalid_length' }

  expect(generatePassword(generator, rules)).toEqual(expected)
  expect(generator.generate).not.toHaveBeenCalled()

  rules.length = 65

  expect(generatePassword(generator, rules)).toEqual(expected)
  expect(generator.generate).not.toHaveBeenCalled()
})

it('should return error when no character types are selected', () => {
  rules.length = 12

  expect(generatePassword(generator, rules)).toEqual({
    ok: false,
    error: 'no_character_types'
  })

  expect(generator.generate).not.toHaveBeenCalled()
})

it('should return generated password when rules are valid', () => {
  rules.includesUppercase = true
  rules.includesLowercase = true
  rules.includesNumbers = true
  rules.includesSymbols = true

  expect(generatePassword(generator, rules)).toEqual({
    ok: true,
    data: 'P4$5W0rD!'
  })

  expect(generator.generate).toHaveBeenCalledWith(rules)
})
