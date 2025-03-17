import { PrismaPetRepository } from 'src/repositories/prisma/prisma-pet-repository'
import { SearchPetUseCase } from '../search-especify-pet'

export function MakeSearchEspecifyPetUseCase() {
  const petsRepository = new PrismaPetRepository()
  const useCase = new SearchPetUseCase(petsRepository)

  return useCase
}
