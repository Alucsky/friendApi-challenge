import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import {
  Age,
  AnimalSize,
  EnergyLevel,
  Environment,
  IndependenceLevel,
} from 'src/entities/pet'
import { MakeSearchPetsFilterUseCase } from 'src/use-cases/factories/makeSearchPetsFilterUseCase'

export async function SearchPetsFilter(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const searchPetFilterSchema = z.object({
    cityId: z.string(),
    age: z.enum([Age.PUPPY, Age.YOUNG, Age.ADULT, Age.SENIOR]).optional(),
    animalSize: z
      .enum([
        AnimalSize.SMALL,
        AnimalSize.MEDIUM,
        AnimalSize.LARGE,
        AnimalSize.XLARGE,
      ])
      .optional(),
    energyLevel: z
      .enum([EnergyLevel.LOW, EnergyLevel.MEDIUM, EnergyLevel.HIGH])
      .optional(),
    independenceLevel: z
      .enum([
        IndependenceLevel.LOW,
        IndependenceLevel.MEDIUM,
        IndependenceLevel.HIGH,
      ])
      .optional(),
    environment: z
      .enum([Environment.INDOOR, Environment.OUTDOOR, Environment.BOTH])
      .optional(),
  })

  const {
    cityId,
    age,
    animalSize,
    energyLevel,
    independenceLevel,
    environment,
  } = searchPetFilterSchema.parse(request.query)

  const searchPetsFilterUseCase = MakeSearchPetsFilterUseCase()

  const { pets } = await searchPetsFilterUseCase.execute({
    city_id: cityId,
    age,
    animalSize,
    energyLevel,
    independenceLevel,
    environment,
  })

  return reply.status(201).send({ pets })
}
