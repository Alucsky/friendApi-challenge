import { InMemoryOrgsRepos } from 'src/repositories/in-Memory/inMemory-orgs-repository'
import { InMemoryCityRepos } from 'src/repositories/in-Memory/inMemmory-city-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepos } from 'src/repositories/in-Memory/inMemory-pets-repository'
import { City } from 'src/entities/city'
import { Org } from 'src/entities/org'
import {
  Age,
  AnimalSize,
  EnergyLevel,
  Environment,
  IndependenceLevel,
  Pet,
} from 'src/entities/pet'
import { SearchPetsOrgUseCase } from 'src/use-cases/search-pets-filter'

let orgRepository: InMemoryOrgsRepos
let cityRepository: InMemoryCityRepos
let petsRepository: InMemoryPetsRepos
let sut: SearchPetsOrgUseCase

describe('City use case', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgsRepos()
    cityRepository = new InMemoryCityRepos()
    petsRepository = new InMemoryPetsRepos()
    sut = new SearchPetsOrgUseCase(petsRepository)

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

  it('should can search multiple by characteristics', async () => {
    for (let i = 0; i < 10; i++) {
      const pet = new Pet(
        {
          name: 'Luna',
          about: 'Luna is a quiet cat',
          age: Age.SENIOR,
          animalSize: AnimalSize.LARGE,
          energyLevel: EnergyLevel.LOW,
          independenceLevel: IndependenceLevel.LOW,
          environment: Environment.INDOOR,
          pictures: ['https://example.com/image4.jpg'],
          required: ['food', 'litter'],
          adopted: true,
          city_id: 'id-city',
          org_id: 'id-org',
        },
        `id-pet-${i + 1}`
      )

      await petsRepository.create(pet)
    }

    const otherCity = new City(
      {
        name: 'florianopolis',
      },
      'id-other-city'
    )

    const otherPet = new Pet(
      {
        name: 'Luna',
        about: 'Luna is a quiet cat',
        age: Age.SENIOR,
        animalSize: AnimalSize.LARGE,
        energyLevel: EnergyLevel.LOW,
        independenceLevel: IndependenceLevel.LOW,
        environment: Environment.INDOOR,
        pictures: ['https://example.com/image4.jpg'],
        required: ['food', 'litter'],
        adopted: true,
        city_id: 'id-other-city',
        org_id: 'id-org',
      },
      `id-other-pet`
    )

    await petsRepository.create(otherPet)

    const { pets } = await sut.execute({
      city_id: 'id-city',
      age: Age.SENIOR,
      animalSize: AnimalSize.LARGE,
      energyLevel: EnergyLevel.LOW,
      independenceLevel: IndependenceLevel.LOW,
      environment: Environment.INDOOR,
    })
    expect(pets).toHaveLength(10)
  })
})
