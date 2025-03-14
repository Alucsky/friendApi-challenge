import { orgRoutes } from '@/HTTP/controllers/routes/org.routes'
import { petRoutes } from '@/HTTP/controllers/routes/pet.routes'

import fastify from 'fastify'

export const app = fastify()

app.register(orgRoutes)
app.register(petRoutes)
