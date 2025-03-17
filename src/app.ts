import fastify from 'fastify'
import { OrgRoutes } from './HTTP/controllers/routes/org.routes'
import { CitiesRoutes } from './HTTP/controllers/routes/city.routes'
import { PetRoutes } from './HTTP/controllers/routes/pet.routes'

export const app = fastify()

app.register(OrgRoutes)
app.register(CitiesRoutes)
app.register(PetRoutes)
