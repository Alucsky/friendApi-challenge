import { FastifyInstance } from 'fastify'
import { RegisterPet } from '../pets/registerPet'
import { SearchEspecifyPet } from '../pets/searchEspecifyPet'

export async function PetRoutes(app: FastifyInstance) {
  app.post('/pet', RegisterPet)
  app.get('/pet/:id', SearchEspecifyPet)
  app.get('/pet', SearchEspecifyPet)
}
