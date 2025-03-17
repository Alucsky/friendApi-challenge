import { FastifyInstance } from 'fastify'
import { RegisterOrg } from '../orgs/registerOrg'
import { AuthenticateOrg } from '../orgs/authenticateOrg'

export async function OrgRoutes(app: FastifyInstance) {
  app.post('/org', RegisterOrg)
  app.post('/sessions', AuthenticateOrg)
}
