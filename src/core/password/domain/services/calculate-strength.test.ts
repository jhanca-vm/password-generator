import { expect, it } from '@rstest/core'

import { PASSWORD_LENGTH } from '../constants'
import type { PasswordRules } from '../types'
import { calculateStrength } from './calculate-strength'

const rules: PasswordRules = {
  length: PASSWORD_LENGTH.MIN,
  includesUppercase: false,
  includesLowercase: false,
  includesNumbers: false,
  includesSymbols: false
}

it('should return 0 when no character types are selected', () => {
  expect(calculateStrength(rules)).toBe(0)

  rules.length = PASSWORD_LENGTH.RECOMMENDED

  expect(calculateStrength(rules)).toBe(0)
})

it('should return 1 for single character type regardless of length', () => {
  rules.includesUppercase = true

  expect(calculateStrength(rules)).toBe(1)

  rules.length = PASSWORD_LENGTH.MIN

  expect(calculateStrength(rules)).toBe(1)
})

it('should return 1 with short length and 2 character types selected', () => {
  rules.includesLowercase = true

  expect(calculateStrength(rules)).toBe(1)
})

it('should return 2 with optimal length and 2 character types selected', () => {
  rules.length = PASSWORD_LENGTH.RECOMMENDED

  expect(calculateStrength(rules)).toBe(2)
})

it('should return 3 with optimal length and 3 character types selected', () => {
  rules.includesNumbers = true

  expect(calculateStrength(rules)).toBe(3)
})

it('should return 2 with short length and 3 character types selected', () => {
  rules.length = PASSWORD_LENGTH.MIN

  expect(calculateStrength(rules)).toBe(2)
})

it('should return 3 with short length and 4 character types selected', () => {
  rules.includesSymbols = true

  expect(calculateStrength(rules)).toBe(3)
})

it('should return 4 with optimal length and 4 character types selected', () => {
  rules.length = PASSWORD_LENGTH.RECOMMENDED

  expect(calculateStrength(rules)).toBe(4)
})
