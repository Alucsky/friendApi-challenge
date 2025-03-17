import { FastifyInstance } from 'fastify'
import { RegisterPet } from '../pets/registerPet'
import { SearchEspecifyPet } from '../pets/searchEspecifyPet'
import { SearchPetsFilter } from '../pets/searchPetsFilter'

export async function PetRoutes(app: FastifyInstance) {
  app.post('/pet', RegisterPet)
  app.get('/pet/:id', SearchEspecifyPet)
  app.get('/pet', SearchPetsFilter)
}
