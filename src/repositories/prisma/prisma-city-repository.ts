import { City } from '@/entities/city'
import { citiesRepository } from '../cities-repository'
import { prisma } from '@/lib/prisma'
import { PrismaCityMapper } from './mappers/prisma-city-mapper'

export class PrismaCityRepository implements citiesRepository {
  async findByName(name: string) {
    const prismaCity = await prisma.city.findUnique({
      where: {
        name,
      },
    })
    if (!prismaCity) {
      return null
    }
    return PrismaCityMapper.toDomain(prismaCity)
  }
  async create(city: City) {
    const data = await PrismaCityMapper.toPrisma(city)

    await prisma.city.create({
      data,
    })
  }
  async findById(id: string) {
    const prismaCity = await prisma.city.findUnique({
      where: {
        id,
      },
    })
    if (!prismaCity) {
      return null
    }
    return PrismaCityMapper.toDomain(prismaCity)
  }
}
