import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeSearchEspecifyPetUseCase } from '@/use-cases/factories/searchEspecifyPetUseCase'
import {
  Age,
  AnimalSize,
  EnergyLevel,
  Environment,
  IndependenceLevel,
} from 'src/entities/pet'
import { MakeSearchPetsFilterUseCase } from '@/use-cases/factories/searchPetsFilterUseCase'

export async function SearchPetsFilter(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const searchPetFilterSchema = z.object({
    city_id: z.string(),
    age: z.enum([Age.PUPPY, Age.YOUNG, Age.ADULT, Age.SENIOR]),
    animalSize: z.enum([
      AnimalSize.SMALL,
      AnimalSize.MEDIUM,
      AnimalSize.LARGE,
      AnimalSize.XLARGE,
    ]),
    energyLevel: z.enum([
      EnergyLevel.LOW,
      EnergyLevel.MEDIUM,
      EnergyLevel.HIGH,
    ]),
    independenceLevel: z.enum([
      IndependenceLevel.LOW,
      IndependenceLevel.MEDIUM,
      IndependenceLevel.HIGH,
    ]),
    environment: z.enum([
      Environment.INDOOR,
      Environment.OUTDOOR,
      Environment.BOTH,
    ]),
  })

  const {
    city_id,
    age,
    animalSize,
    energyLevel,
    independenceLevel,
    environment,
  } = searchPetFilterSchema.parse(request.query)

  const searchPetsFilterUseCase = MakeSearchPetsFilterUseCase()

  const { pets } = await searchPetsFilterUseCase.execute({
    city_id,
    age,
    animalSize,
    energyLevel,
    independenceLevel,
    environment,
  })

  return reply.status(201).send({ pets })
}
