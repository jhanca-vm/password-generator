import { randomInt } from 'node:crypto'

import type { PasswordGenerator } from '../application/generate'

const passwordGenerator: PasswordGenerator = {
  generate(rules) {
    const charGroups: string[] = []
    const usedPositions = new Set<number>()
    const password = new Array<string>(rules.length)

    if (rules.includesUppercase) charGroups.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    if (rules.includesLowercase) charGroups.push('abcdefghijklmnopqrstuvwxyz')
    if (rules.includesNumbers) charGroups.push('0123456789')
    if (rules.includesSymbols) {
      charGroups.push('!@#$%^&*()_+-=[]{}|;:,.<>?/"\\~')
    }

    for (const charGroup of charGroups) {
      let position: number

      do {
        position = randomInt(password.length)
      } while (usedPositions.has(position))

      password[position] = charGroup[randomInt(charGroup.length)]
      usedPositions.add(position)
    }

    if (usedPositions.size < password.length) {
      const charset = charGroups.join('')

      for (let index = 0; index < password.length; index++) {
        if (usedPositions.has(index)) continue

        password[index] = charset[randomInt(charset.length)]
      }
    }

    return password.join('')
  }
}

export default passwordGenerator
