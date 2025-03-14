import { Pet } from '@/entities/pet'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepos implements PetsRepository {
  public pets: Pet[] = []
  async create(data: Pet) {
    this.pets.push(data)
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

  async findByCity(city_id: string) {
    const petsInCity = this.pets.filter((pet) => pet.city_id === city_id)
    return petsInCity
  }
}
