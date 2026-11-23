export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E }

export interface PasswordCharacters {
  includesUppercase: boolean
  includesLowercase: boolean
  includesNumbers: boolean
  includesSymbols: boolean
}

export interface PasswordRules extends PasswordCharacters {
  length: number
}
