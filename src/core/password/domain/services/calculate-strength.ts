import { PASSWORD_LENGTH } from '../constants'
import type { PasswordRules } from '../types'
import { countCharacterTypes } from './count-character-types'

/** @returns Strength score from 0 to 4 */
export function calculateStrength({
  length,
  ...characterTypes
}: PasswordRules) {
  let count = countCharacterTypes(characterTypes)

  if (count > 1 && length < PASSWORD_LENGTH.RECOMMENDED) count--

  return count
}
