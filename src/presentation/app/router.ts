import { passwordRouter } from '../features/generate-password'
import { router } from '../shared/api/trpc/server'

const appRouter = router({ password: passwordRouter })

export type AppRouter = typeof appRouter

export default appRouter
