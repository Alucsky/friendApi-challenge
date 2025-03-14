import { InMemoryOrgsRepos } from 'src/repositories/in-Memory/inMemory-orgs-repository'
import { InMemoryCityRepos } from 'src/repositories/in-Memory/inMemmory-city-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterPetUseCase } from 'src/use-cases/register-pet'
import { InMemoryPetsRepos } from 'src/repositories/in-Memory/inMemory-pets-repository'
import { City } from 'src/entities/city'
import { Org } from 'src/entities/org'
import {
  Age,
  AnimalSize,
  EnergyLevel,
  Environment,
  IndependenceLevel,
} from 'src/entities/pet'
import { ResourceNotFoundError } from 'src/use-cases/errors/resourceNotFound'

let orgRepository: InMemoryOrgsRepos
let cityRepository: InMemoryCityRepos
let petsRepository: InMemoryPetsRepos
let sut: RegisterPetUseCase

describe('City use case', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgsRepos()
    cityRepository = new InMemoryCityRepos()
    petsRepository = new InMemoryPetsRepos()
    sut = new RegisterPetUseCase(petsRepository, orgRepository, cityRepository)

    const newCity = new City(
      {
        name: 'joinville',
      },
      'id-city'
    )

    await cityRepository.create(newCity)

    const newOrg = new Org(
      {
        responsableName: 'John Doe',
        email: 'johndoe@example.com',
        cep: '12345678',
        address: 'Rua Teste, 123',
        phoneNumber: '(11) 99999-9999',
        password_hash: 'asdasdasd',
      },
      'id-org'
    )

    await orgRepository.create(newOrg)
  })

  it('should can register an pet', async () => {
    const newPet = {
      name: 'Rex',
      about: 'Rex is a cute little puppy',
      age: Age.ADULT,
      animalSize: AnimalSize.SMALL,
      energyLevel: EnergyLevel.LOW,
      independenceLevel: IndependenceLevel.HIGH,
      environment: Environment.INDOOR,
      pictures: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
      ],
      required: ['toys', 'food'],
      adopted: false,
      city_id: 'id-city',
      org_id: 'id-org',
    }

    const { pet } = await sut.registerPet(newPet)

    expect(pet.id).toEqual(expect.any(String))
  })
  it('should not register an pet if id of org or city doesnt exists', async () => {
    const newPet = {
      name: 'Rex',
      about: 'Rex is a cute little puppy',
      age: Age.ADULT,
      animalSize: AnimalSize.SMALL,
      energyLevel: EnergyLevel.LOW,
      independenceLevel: IndependenceLevel.HIGH,
      environment: Environment.INDOOR,
      pictures: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
      ],
      required: ['toys', 'food'],
      adopted: false,
      city_id: 'id-non-exists',
      org_id: 'id-non-exists',
    }

    await expect(() => sut.registerPet(newPet)).rejects.toBeInstanceOf(
      ResourceNotFoundError
    )
  })
})
