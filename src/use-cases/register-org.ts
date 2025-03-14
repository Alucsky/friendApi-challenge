import { OrgsRepository } from 'src/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { Org } from 'src/entities/org'
import { orgAlreadyExistsError } from 'src/use-cases/errors/orgAlreadyExists'

interface RegisterOrgUseCaseRequest {
  responsableName: string
  email: string
  cep: string
  address: string
  phoneNumber: string
  password: string
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async registerOrg({
    responsableName,
    email,
    cep,
    address,
    phoneNumber,
    password,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const password_hashed = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new orgAlreadyExistsError()
    }

    const newOrg = new Org({
      responsableName,
      email,
      cep,
      address,
      phoneNumber,
      password_hash: password_hashed,
    })

    await this.orgsRepository.create(newOrg)

    return {
      org: newOrg,
    }
  }
}
