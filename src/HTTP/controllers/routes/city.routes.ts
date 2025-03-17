import { FastifyInstance } from 'fastify'
import { RegisterCity } from '../cities/registerCity'

export async function CitiesRoutes(app: FastifyInstance) {
  app.get('/city', RegisterCity)
}
