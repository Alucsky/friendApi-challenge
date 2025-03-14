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
}
