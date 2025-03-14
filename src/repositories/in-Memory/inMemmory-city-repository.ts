import { City } from 'src/entities/city'
import { citiesRepository } from '../cities-repository'

export class InMemoryCityRepos implements citiesRepository {
  public cities: City[] = []
  async create(city: City) {
    this.cities.push(city)
  }

  async findById(id: string) {
    const city = this.cities.find((city) => {
      return city.id === id
    })

    if (!city) {
      return null
    }

    return city
  }
  async findByName(name: string) {
    const city = this.cities.find((city) => {
      return city.name === name
    })
    if (!city) {
      return null
    }
    return city
  }
}
