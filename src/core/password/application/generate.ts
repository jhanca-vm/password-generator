import type { Result } from '@/shared/types'

import { PASSWORD_LENGTH } from '../domain/constants'
import type { PasswordValidationError } from '../domain/errors'
import { countCharacterTypes } from '../domain/services'
import type { PasswordRules } from '../domain/types'

export interface PasswordGenerator {
  generate: (rules: PasswordRules) => string
}

export default function generatePassword(
  generator: PasswordGenerator,
  rules: PasswordRules
): Result<string, PasswordValidationError> {
  const { length, ...characterTypes } = rules

  if (length < PASSWORD_LENGTH.MIN || length > PASSWORD_LENGTH.MAX) {
    return { ok: false, error: 'invalid_length' }
  }

  if (countCharacterTypes(characterTypes) === 0) {
    return { ok: false, error: 'no_character_types' }
  }

  return { ok: true, data: generator.generate(rules) }
}
