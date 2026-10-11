import { createTRPCClient, httpLink } from '@trpc/client'

import type { AppRouter } from '@/presentation/app/router'

const trpc = createTRPCClient<AppRouter>({
  links: [httpLink({ url: '/trpc' })]
})

export default trpc
