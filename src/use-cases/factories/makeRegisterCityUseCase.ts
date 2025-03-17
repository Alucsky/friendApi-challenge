import { PrismaCityRepository } from 'src/repositories/prisma/prisma-city-repository'
import { RegisterCityUseCase } from '../register-city'

export function MakeRegisterCityUseCase() {
  const cityRepository = new PrismaCityRepository()
  const useCase = new RegisterCityUseCase(cityRepository)

  return useCase
}
