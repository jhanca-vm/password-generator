export interface PasswordRules {
  length: number
  includesUppercase: boolean
  includesLowercase: boolean
  includesNumbers: boolean
  includesSymbols: boolean
}

export type CharacterTypes = Omit<PasswordRules, 'length'>
