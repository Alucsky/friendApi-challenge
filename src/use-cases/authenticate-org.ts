import { compare } from 'bcryptjs'
import { Org } from 'src/entities/org'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { InvalidCredentialsError } from 'src/use-cases/errors/invalidCredentials'

interface AuthenticateRequestProps {
  email: string
  password: string
}

interface AuthenticateResponseProps {
  org: Org
}

export class AuthenticateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateRequestProps): Promise<AuthenticateResponseProps> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, org.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
