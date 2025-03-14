import { InMemoryOrgsRepos } from 'src/repositories/in-Memory/inMemory-orgs-repository'

import { describe, expect, it } from 'vitest'

import { Org } from 'src/entities/org'
import { AuthenticateOrgUseCase } from 'src/use-cases/authenticate-org'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from 'src/use-cases/errors/invalidCredentials'

describe('Org use case', () => {
  it('should can login with org', async () => {
    const orgRepository = new InMemoryOrgsRepos()
    const sut = new AuthenticateOrgUseCase(orgRepository)

    const newOrg = new Org(
      {
        responsableName: 'John Doe',
        email: 'johndoe@example.com',
        cep: '12345678',
        address: 'Rua Teste, 123',
        phoneNumber: '(11) 99999-9999',
        password_hash: await hash('password', 6),
      },
      'id-org'
    )

    await orgRepository.create(newOrg)

    const { org } = await sut.execute({
      email: 'johndoe@example.com',
      password: 'password',
    })

    expect(org.id).toEqual(expect.any(String))
  })
  it('should not can login with wrong email', async () => {
    const orgRepository = new InMemoryOrgsRepos()
    const sut = new AuthenticateOrgUseCase(orgRepository)

    const newOrg = new Org(
      {
        responsableName: 'John Doe',
        email: 'johndoe@example.com',
        cep: '12345678',
        address: 'Rua Teste, 123',
        phoneNumber: '(11) 99999-9999',
        password_hash: await hash('password', 6),
      },
      'id-org'
    )

    await orgRepository.create(newOrg)

    await expect(
      async () =>
        await sut.execute({
          email: 'johasdndoe@example.com',
          password: 'password',
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  it('should not can login with wrong password', async () => {
    const orgRepository = new InMemoryOrgsRepos()
    const sut = new AuthenticateOrgUseCase(orgRepository)

    const newOrg = new Org(
      {
        responsableName: 'John Doe',
        email: 'johndoe@example.com',
        cep: '12345678',
        address: 'Rua Teste, 123',
        phoneNumber: '(11) 99999-9999',
        password_hash: await hash('password', 6),
      },
      'id-org'
    )

    await orgRepository.create(newOrg)

    await expect(
      async () =>
        await sut.execute({
          email: 'johndoe@example.com',
          password: 'password123',
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
