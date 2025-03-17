import {
  Age,
  AnimalSize,
  EnergyLevel,
  Environment,
  IndependenceLevel,
  Pet,
} from 'src/entities/pet'

export abstract class PetsRepository {
  abstract create(pet: Pet): Promise<Pet | void>
  abstract findById(id: string): Promise<Pet | null>

  abstract findByCharacteristics(
    city_id: string,
    age: Age,
    animalSize: AnimalSize,
    energyLevel: EnergyLevel,
    independenceLevel: IndependenceLevel,
    environment: Environment
  ): Promise<Pet[] | null>
}

// age: Age
// animalSize: AnimalSize
// energyLevel: EnergyLevel
// independenceLevel: IndependenceLevel
// environment: Environment
