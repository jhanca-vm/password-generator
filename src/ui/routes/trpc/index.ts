import { router } from '@/ui/lib/trpc/server'

import passwordRouter from './password'

export const appRouter = router({
  password: passwordRouter
})

export type AppRouter = typeof appRouter
