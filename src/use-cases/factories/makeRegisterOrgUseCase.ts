import { PrismaOrgsRepository } from 'src/repositories/prisma/prisma-orgs-repository'
import { RegisterOrgUseCase } from '../register-org'

export function MakeRegisterOrgUseCase() {
  const orgRepository = new PrismaOrgsRepository()
  const useCase = new RegisterOrgUseCase(orgRepository)

  return useCase
}
