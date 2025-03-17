import { Pet } from 'src/entities/pet'
import { PetsRepository } from 'src/repositories/pets-repository'
import { ResourceNotFoundError } from 'src/use-cases/errors/resourceNotFound'

interface SearchPetsRequestProps {
  pet_Id: string
}

interface SearchPetsResponseProps {
  pet: Pet
}

export class SearchPetsOrgUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    pet_Id,
  }: SearchPetsRequestProps): Promise<SearchPetsResponseProps> {
    const pet = await this.petsRepository.findById(pet_Id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
