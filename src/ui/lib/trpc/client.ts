import { createTRPCClient, httpLink } from '@trpc/client'

import type { AppRouter } from '@/ui/routes/trpc'

const trpc = createTRPCClient<AppRouter>({
  links: [httpLink({ url: '/trpc' })]
})

export default trpc
