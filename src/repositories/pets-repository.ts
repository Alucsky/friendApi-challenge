import { Pet } from '@/entities/pet'

export abstract class PetsRepository {
  abstract create(data: Pet): Promise<void>
  abstract findById(id: string): Promise<Pet | null>
}
