import { Org } from '@/entities/org'

export abstract class OrgsRepository {
  abstract create(data: Org): Promise<void>
  abstract findById(id: string): Promise<Org | null>
  abstract findByEmail(email: string): Promise<Org | null>
}
