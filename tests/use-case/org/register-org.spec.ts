import { orgAlreadyExistsError } from 'src/use-cases/errors/orgAlreadyExists'
import { InMemoryOrgsRepos } from 'src/repositories/in-Memory/inMemory-orgs-repository'
import { RegisterOrgUseCase } from 'src/use-cases/register-org'
import { expect, describe, it } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { beforeEach } from 'vitest'

let orgRepository: InMemoryOrgsRepos
let sut: RegisterOrgUseCase
describe('Org use case', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgsRepos()
    sut = new RegisterOrgUseCase(orgRepository)
  })

  it('should can register an organization', async () => {
    const { org } = await sut.registerOrg({
      responsableName: 'John Doe',
      email: 'johndoe@example.com',
      cep: '12345-678',
      address: 'Rua Teste, 123',
      phoneNumber: '11 99999999',
      password: 'password_hash',
    })

    expect(org.id).toEqual(expect.any(String))
  })
  it('should not register an organization with duplicate email', async () => {
    const email = 'johndoe@example.com'

    await sut.registerOrg({
      responsableName: 'John Doe',
      email,
      cep: '12345-678',
      address: 'Rua Teste, 123',
      phoneNumber: '11 99999999',
      password: 'password_hash',
    })

    await expect(() =>
      sut.registerOrg({
        responsableName: 'Johna Doe',
        email,
        cep: '12345-678',
        address: 'Rua Teste, 123',
        phoneNumber: '11 99999999',
        password: 'passasdassh',
      })
    ).rejects.toBeInstanceOf(orgAlreadyExistsError)
  })
  it('should can hash the password', async () => {
    const { org } = await sut.registerOrg({
      responsableName: 'John Doe',
      email: 'johndoe@example.com',
      cep: '12345-678',
      address: 'Rua Teste, 123',
      phoneNumber: '11 99999999',
      password: 'this password must be hashed',
    })

    const isPasswordCorrectlyHashed = await compare(
      'this password must be hashed',
      org.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
