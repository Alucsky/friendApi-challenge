import {
  Age,
  AnimalSize,
  EnergyLevel,
  Environment,
  IndependenceLevel,
  Pet,
} from 'src/entities/pet'
import { PetsRepository } from 'src/repositories/pets-repository'

interface SearchPetsRequestProps {
  city_id: string
  age: Age | undefined
  animalSize: AnimalSize | undefined
  energyLevel: EnergyLevel | undefined
  independenceLevel: IndependenceLevel | undefined
  environment: Environment | undefined
}

interface SearchPetsResponseProps {
  pets: Pet[] | null
}

export class SearchPetsFilterUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city_id,
    age,
    animalSize,
    energyLevel,
    independenceLevel,
    environment,
  }: SearchPetsRequestProps): Promise<SearchPetsResponseProps> {
    const pets = await this.petsRepository.findByCharacteristics({
      city_id,
      age,
      animalSize,
      energyLevel,
      independenceLevel,
      environment,
    })

    return {
      pets,
    }
  }
}
