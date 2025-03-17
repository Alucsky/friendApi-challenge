import {
  Age,
  AnimalSize,
  Environment,
  IndependenceLevel,
  EnergyLevel,
} from 'src/entities/pet'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeRegisterPetUseCase } from '@/use-cases/factories/registerPetUseCase'

// const newPet = {
//   name: 'Rex',
//   about: 'Rex is a cute little puppy',
//   age: Age.ADULT,
//   animalSize: AnimalSize.SMALL,
//   energyLevel: EnergyLevel.LOW,
//   independenceLevel: IndependenceLevel.HIGH,
//   environment: Environment.INDOOR,
//   pictures: [
//     'https://example.com/image1.jpg',
//     'https://example.com/image2.jpg',
//   ],
//   required: ['toys', 'food'],
//   adopted: false,
//   city_id: 'id-city',
//   org_id: 'id-org',
// }

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

 return reply.status(201).send({ message: 'Pete registered successfully' })
}
