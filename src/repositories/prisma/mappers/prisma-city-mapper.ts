import { City } from '@/entities/city'
import { Prisma, City as PrismaCity } from '@prisma/client'

export class PrismaCityMapper {
  static toPrisma(city: City): Prisma.CityCreateInput {
    return {
      id: city.id,
      name: city.name,
    }
  }
  static toDomain(prismaCity: PrismaCity): City {
    return new City(
      {
        name: prismaCity.name,
      },
      prismaCity.id
    )
  }
}
