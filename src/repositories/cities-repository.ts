import { City } from 'src/entities/city'

export abstract class citiesRepository {
  abstract create(data: City): Promise<void>
  abstract findById(id: string): Promise<City | null>
  abstract findByName(name: string): Promise<City | null>
}
