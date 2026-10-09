import { useReducer, useTransition, type SubmitEvent } from 'react'

import { PASSWORD_LENGTH } from '@/core/password/domain/constants'
import { calculateStrength } from '@/core/password/domain/services'
import type {
  CharacterTypes,
  PasswordRules
} from '@/core/password/domain/types'

import trpc from '../lib/trpc/client'

interface State extends PasswordRules {
  password: string | null
}

type Action =
  | { type: 'changed_password'; payload: string }
  | { type: 'changed_length'; payload: number }
  | { type: 'toggled_character_type'; payload: keyof CharacterTypes }

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'changed_password':
      return { ...state, password: action.payload }
    case 'changed_length':
      return { ...state, password: null, length: action.payload }
    case 'toggled_character_type':
      return {
        ...state,
        password: null,
        [action.payload]: !state[action.payload]
      }
  }
}

export default function usePasswordForm() {
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
    strength: calculateStrength(rules),
    handleSubmit(event: SubmitEvent<HTMLFormElement>) {
      event.preventDefault()

      startTransition(async () => {
        const result = await trpc.password.generate.mutate(rules)

        if (result.ok) {
          dispatch({ type: 'changed_password', payload: result.data })
        }
      })
    },
    setLength(length: number) {
      dispatch({ type: 'changed_length', payload: length })
    },
    toggleCharacterType(key: keyof CharacterTypes) {
      dispatch({ type: 'toggled_character_type', payload: key })
    }
  }
}
