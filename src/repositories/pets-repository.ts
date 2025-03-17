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
    age: Age | undefined,
    animalSize: AnimalSize | undefined,
    energyLevel: EnergyLevel | undefined,
    independenceLevel: IndependenceLevel | undefined,
    environment: Environment | undefined
  ): Promise<Pet[] | null>
}

// age: Age
// animalSize: AnimalSize
// energyLevel: EnergyLevel
// independenceLevel: IndependenceLevel
// environment: Environment
