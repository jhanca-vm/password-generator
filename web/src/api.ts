import type { PasswordRules, Result } from './types'
import { Err, Ok } from './utils/result'

interface Error {
  status: number
  message: string
}

export default {
  password: {
    async generate(rules: PasswordRules): Promise<Result<string, Error>> {
      const response = await fetch('/api/password/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rules)
      })

      const result = await response.text()

      return response.ok
        ? Ok(result)
        : Err({ status: response.status, message: result })
    }
  }
}
