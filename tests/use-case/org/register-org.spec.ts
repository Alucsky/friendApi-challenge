import { orgAlreadyExistsError } from 'src/use-cases/errors/orgAlreadyExists'
import { inMemoryOrgsRepos } from 'src/repositories/in-Memory/inMemory-orgs-repository'
import { registerOrgUseCase } from 'src/use-cases/register-org'
import { expect, describe, it } from 'vitest'
import { compare, hash } from 'bcryptjs'

describe('Org use case', () => {
  it('should can register an organization', async () => {
    const orgRepository = new inMemoryOrgsRepos()
    const sut = new registerOrgUseCase(orgRepository)

    const { org } = await sut.registerOrg({
      responsableName: 'John Doe',
      email: 'johndoe@example.com',
      cep: '12345-678',
      address: 'Rua Teste, 123',
      phoneNumber: '11 99999999',
      password_hash: 'password_hash',
    })

    expect(org.id).toEqual(expect.any(String))
  })
  it('should not register an organization with duplicate email', async () => {
    const orgRepository = new inMemoryOrgsRepos()
    const sut = new registerOrgUseCase(orgRepository)

    const email = 'johndoe@example.com'

    await sut.registerOrg({
      responsableName: 'John Doe',
      email,
      cep: '12345-678',
      address: 'Rua Teste, 123',
      phoneNumber: '11 99999999',
      password_hash: 'password_hash',
    })

    await expect(() =>
      sut.registerOrg({
        responsableName: 'Johna Doe',
        email,
        cep: '12345-678',
        address: 'Rua Teste, 123',
        phoneNumber: '11 99999999',
        password_hash: 'passasdassh',
      })
    ).rejects.toBeInstanceOf(orgAlreadyExistsError)
  })
  it('should can hash the password', async () => {
    const orgRepository = new inMemoryOrgsRepos()
    const sut = new registerOrgUseCase(orgRepository)

    const { org } = await sut.registerOrg({
      responsableName: 'John Doe',
      email: 'johndoe@example.com',
      cep: '12345-678',
      address: 'Rua Teste, 123',
      phoneNumber: '11 99999999',
      password_hash: 'this password must be hashed',
    })

    const isPasswordCorrectlyHashed = await compare(
      'this password must be hashed',
      org.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
