import { PrismaOrgsRepository } from 'src/repositories/prisma/prisma-orgs-repository'
import { RegisterPetUseCase } from '../register-pet'
import { PrismaCityRepository } from 'src/repositories/prisma/prisma-city-repository'
import { PrismaPetRepository } from 'src/repositories/prisma/prisma-pet-repository'

export function MakeRegisterPetUseCase() {
  const petsRepository = new PrismaPetRepository()
  const useCase = new RegisterPetUseCase(petsRepository)

  return useCase
}
