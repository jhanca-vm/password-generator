import type { CharacterTypes } from '../types'

export function countCharacterTypes(characterTypes: CharacterTypes) {
  return (
    Number(characterTypes.includesUppercase) +
    Number(characterTypes.includesLowercase) +
    Number(characterTypes.includesNumbers) +
    Number(characterTypes.includesSymbols)
  )
}
