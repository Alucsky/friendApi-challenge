import {
  Age,
  AnimalSize,
  EnergyLevel,
  Environment,
  IndependenceLevel,
  Pet,
} from 'src/entities/pet'
import { citiesRepository } from 'src/repositories/cities-repository'
import { OrgsRepository } from 'src/repositories/orgs-repository'
import { PetsRepository } from 'src/repositories/pets-repository'
import { ResourceNotFoundError } from 'src/use-cases/errors/resourceNotFound'

interface RegisterPetUseCaseRequest {
  name: string
  about: string
  age: Age
  animalSize: AnimalSize
  energyLevel: EnergyLevel
  independenceLevel: IndependenceLevel
  environment: Environment
  pictures: string[]
  required: string[]
  adopted: boolean
  city_id: string
  org_id: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class registerPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
    private citiesRepository: citiesRepository
  ) {}

  async registerOrg({
    name,
    about,
    age,
    animalSize,
    energyLevel,
    independenceLevel,
    environment,
    pictures,
    required,
    adopted,
    city_id,
    org_id,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const org = await this.orgsRepository.findById(org_id)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const city = await this.citiesRepository.findById(city_id)

    if (!city) {
      throw new ResourceNotFoundError()
    }

    const newPet = new Pet({
      name,
      about,
      age,
      animalSize,
      energyLevel,
      independenceLevel,
      environment,
      pictures,
      required,
      adopted,
      city_id,
      org_id,
    })

    await this.petsRepository.create(newPet)

    return {
      pet: newPet,
    }
  }
}
