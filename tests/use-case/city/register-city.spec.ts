import { InMemoryCityRepos } from 'src/repositories/in-Memory/inMemmory-city-repository'
import { RegisterCityUseCase } from 'src/use-cases/register-city'
import { describe, expect, it } from 'vitest'

describe('City use case', () => {
  it('should can register an city', async () => {
    const cityRepository = new InMemoryCityRepos()
    const sut = new RegisterCityUseCase(cityRepository)

    const { city } = await sut.registerCity({
      name: 'Joinville',
    })

    expect(city.id).toEqual(expect.any(String))
  })
  it('should not register an city if it already exists', async () => {
    const cityRepository = new InMemoryCityRepos()
    const sut = new RegisterCityUseCase(cityRepository)

    await sut.registerCity({
      name: 'Joinville',
    })

    await expect(sut.registerCity({ name: 'Joinville' })).rejects.toThrow()
  })
})
