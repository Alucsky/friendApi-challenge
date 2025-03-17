import {
  Age,
  AnimalSize,
  Environment,
  IndependenceLevel,
  EnergyLevel,
} from 'src/entities/pet'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeRegisterPetUseCase } from '@/use-cases/factories/makeRegisterPetUseCase'

export async function RegisterPet(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerPetSchema = z.object({
    name: z.string(),
    about: z.string(),
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
    pictures: z.array(z.string().url()),
    required: z.array(z.string()),
    adopted: z.boolean(),
    city_id: z.string(),
    org_id: z.string(),
  })

  const {
    name,
    about,
    age,
    animalSize,
    energyLevel,
    independenceLevel,
    environment,
    pictures,
    required,
    adopted,
    city_id,
    org_id,
  } = registerPetSchema.parse(request.body)

  const registerPetUseCase = MakeRegisterPetUseCase()

  await registerPetUseCase.registerPet({
    name,
    about,
    age,
    animalSize,
    energyLevel,
    independenceLevel,
    environment,
    pictures,
    required,
    adopted,
    city_id,
    org_id,
  })

  return reply.status(201).send({ message: 'Pet registered successfully' })
}
