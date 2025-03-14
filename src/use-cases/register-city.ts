import { City } from 'src/entities/city'
import { citiesRepository } from 'src/repositories/cities-repository'
import { cityAlreadyExistsError } from 'src/use-cases/errors/cityAlreadyExists'

interface RegisterCityUseCaseRequest {
  name: string
}

interface RegisterCityUseCaseResponse {
  city: City
}

export class RegisterCityUseCase {
  constructor(private citiesRepository: citiesRepository) {}

  async registerCity({
    name,
  }: RegisterCityUseCaseRequest): Promise<RegisterCityUseCaseResponse> {
    const cityWithSameName = await this.citiesRepository.findByName(name)

    if (cityWithSameName) {
      throw new cityAlreadyExistsError()
    }

    const newCity = new City({
      name,
    })

    await this.citiesRepository.create(newCity)

    return {
      city: newCity,
    }
  }
}
