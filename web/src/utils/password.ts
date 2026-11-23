import { PASSWORD_LENGTH } from '@/constants'
import type { PasswordRules } from '@/types'

/** @returns Strength score from 0 to 4 */
export function passwordStrength(rules: PasswordRules) {
  let score =
    Number(rules.includesUppercase) +
    Number(rules.includesLowercase) +
    Number(rules.includesNumbers) +
    Number(rules.includesSymbols)

  if (score > 1 && rules.length < PASSWORD_LENGTH.RECOMMENDED) score--

  return score
}
