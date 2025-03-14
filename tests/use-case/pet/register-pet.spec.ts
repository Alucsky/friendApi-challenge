import { inMemoryCityRepos } from 'src/repositories/in-Memory/inMemmory-city-repository'
import { registerCityUseCase } from 'src/use-cases/register-city'
import { describe, expect, it } from 'vitest'

describe('Pet use case', () => {
  it('should can register an pet', async () => {
    const cityRepository = new inMemoryCityRepos()
    const sut = new registerCityUseCase(cityRepository)

    const { city } = await sut.registerOrg({
      name: 'Joinville',
    })

    expect(city.id).toEqual(expect.any(String))
  })
  it('should not register an city if it already exists', async () => {
    const cityRepository = new inMemoryCityRepos()
    const sut = new registerCityUseCase(cityRepository)
    await sut.registerOrg({
      name: 'Joinville',
    })
    await expect(sut.registerOrg({ name: 'Joinville' })).rejects.toThrow()
  })
})
