import { IFindPetsByCharacteristicsDTO } from '@/dtos/IFindPetsByCharacteristicsDTO'
import { Pet } from 'src/entities/pet'

export abstract class PetsRepository {
  abstract create(pet: Pet): Promise<Pet | void>
  abstract findById(id: string): Promise<Pet | null>

  abstract findByCharacteristics(
    data: IFindPetsByCharacteristicsDTO
  ): Promise<Pet[]>
}
