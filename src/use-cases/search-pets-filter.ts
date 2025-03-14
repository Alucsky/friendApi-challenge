import { Pet } from 'src/entities/pet'
import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from 'src/use-cases/errors/resourceNotFound'

interface SearchPetsRequestProps {
  city_id: string
}

interface SearchPetsResponseProps {
  pets: Pet[]
}

export class SearchPetsOrgUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city_id,
  }: SearchPetsRequestProps): Promise<SearchPetsResponseProps> {
    const pets = await this.petsRepository.findByCity(city_id)

    if (!pets) {
      throw new ResourceNotFoundError()
    }

    return {
      pets,
    }
  }
}
