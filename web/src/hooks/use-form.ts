import { type SubmitEvent, useReducer, useTransition } from 'react'
import api from '@/api'
import { PASSWORD_LENGTH } from '@/constants'
import type { PasswordCharacters, PasswordRules } from '@/types'
import { passwordStrength } from '@/utils/password'
import { isOk } from '@/utils/result'

interface State extends PasswordRules {
  password: string | null
}

type Action =
  | { type: 'changed_password'; payload: string }
  | { type: 'changed_length'; payload: number }
  | { type: 'toggled_character'; payload: keyof PasswordCharacters }

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'changed_password':
      return { ...state, password: action.payload }
    case 'changed_length':
      return { ...state, password: null, length: action.payload }
    case 'toggled_character':
      return {
        ...state,
        password: null,
        [action.payload]: !state[action.payload]
      }
  }
}

export default function useForm() {
  const [isPending, startTransition] = useTransition()

  const [state, dispatch] = useReducer(reducer, {
    password: null,
    length: PASSWORD_LENGTH.RECOMMENDED,
    includesUppercase: true,
    includesLowercase: true,
    includesNumbers: true,
    includesSymbols: true
  })

  const { password, ...rules } = state

  return {
    isPending,
    password,
    rules,
    strength: passwordStrength(rules),
    handleSubmit(event: SubmitEvent<HTMLFormElement>) {
      event.preventDefault()

      startTransition(async () => {
        const result = await api.password.generate(rules)

        if (isOk(result)) {
          dispatch({ type: 'changed_password', payload: result.value })
        } else {
          console.error(result.error)
        }
      })
    },
    setLength(length: number) {
      dispatch({ type: 'changed_length', payload: length })
    },
    toggleCharacter(key: keyof PasswordCharacters) {
      dispatch({ type: 'toggled_character', payload: key })
    }
  }
}
