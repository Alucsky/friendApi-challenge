import {
  Age,
  AnimalSize,
  EnergyLevel,
  Environment,
  IndependenceLevel,
  Pet,
} from 'src/entities/pet'
import { PetsRepository } from '../pets-repository'
import { invalidCityError } from 'src/use-cases/errors/invalidCity'
import { IFindPetsByCharacteristicsDTO } from 'src/dtos/IFindPetsByCharacteristicsDTO'

export class InMemoryPetsRepos implements PetsRepository {
  public pets: Pet[] = []
  async create(pet: Pet) {
    this.pets.push(pet)

    return pet
  }
  async findById(id: string) {
    const pet = this.pets.find((pet) => {
      return pet.id === id
    })

    if (!pet) {
      return null
    }

    return pet
  }

  async findByCharacteristics({
    city_id,
    age,
    animalSize,
    energyLevel,
    independenceLevel,
    environment,
  }: IFindPetsByCharacteristicsDTO) {
    const filters = {
      city_id,
      age,
      animalSize,
      energyLevel,
      independenceLevel,
      environment,
    }

    const petsPassedInFilter = this.pets.filter((pet) => {
      return Object.entries(filters).every(([key, value]) => {
        if (value !== undefined) {
          return pet[key as keyof Pet] === value
        }
        return true
      })
    })

    return petsPassedInFilter
  }
}
