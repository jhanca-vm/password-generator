import * as v from 'valibot'

import generatePassword from '@/core/password/application/generate'
import { PASSWORD_LENGTH } from '@/core/password/domain/constants'
import passwordGenerator from '@/core/password/infrastructure/generator'
import { procedure, router } from '@/ui/lib/trpc/server'

const passwordRouter = router({
  generate: procedure
    .input(
      v.object({
        length: v.pipe(
          v.number(),
          v.integer(),
          v.toMinValue(PASSWORD_LENGTH.MIN)
        ),
        includesUppercase: v.boolean(),
        includesLowercase: v.boolean(),
        includesNumbers: v.boolean(),
        includesSymbols: v.boolean()
      })
    )
    .mutation(({ input }) => generatePassword(passwordGenerator, input))
})

export default passwordRouter
