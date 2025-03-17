
import { PrismaPetRepository } from 'src/repositories/prisma/prisma-pet-repository'
import { SearchPetsFilterUseCase } from '../search-pets-filter'

export function MakeSearchPetsFilterUseCase() {
  const petsRepository = new PrismaPetRepository()
  const useCase = new SearchPetsFilterUseCase(petsRepository)

  return useCase
}
