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

  it('should can search pet by id', async () => {
    const pet = new Pet(
      {
        name: 'Luna',
        about: 'Luna is a quiet cat',
        age: Age.PUPPY,
        animalSize: AnimalSize.SMALL,
        energyLevel: EnergyLevel.HIGH,
        independenceLevel: IndependenceLevel.LOW,
        environment: Environment.OUTDOOR,
        pictures: ['https://example.com/image1.jpg'],
        required: ['toys', 'food'],
        adopted: false,
        city_id: 'id-city',
        org_id: 'id-org',
      },
      'id-pet'
    )

    const newPet = await petsRepository.create(pet)

    expect(newPet.id).toEqual(expect.any(String))
  })
})
