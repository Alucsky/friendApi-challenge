import { Pet } from 'src/entities/pet'
import { PetsRepository } from '../pets-repository'
import { prisma } from 'src/lib/prisma'
import { PrismaPetMapper } from './mappers/prisma-pet-mapper'
import { IFindPetsByCharacteristicsDTO } from 'src/dtos/IFindPetsByCharacteristicsDTO'

export class PrismaPetRepository implements PetsRepository {
  async create(pet: Pet) {
    const data = PrismaPetMapper.toPrisma(pet)

    const newPet = await prisma.pet.create({
      data,
    })

    return PrismaPetMapper.toDomain(newPet)
  }

  async findById(id: string) {
    const prismaPet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    if (!prismaPet) {
      return null
    }

    return PrismaPetMapper.toDomain(prismaPet)
  }

  async findByCharacteristics({
    city_id,
    age,
    animalSize,
    energyLevel,
    independenceLevel,
    environment,
  }: IFindPetsByCharacteristicsDTO) {
    const raw = await prisma.pet.findMany({
      where: {
        city_id,
        age,
        animalSize,
        energyLevel,
        independenceLevel,
        environment,
      },
    })

    return raw.map(PrismaPetMapper.toDomain)
  }
}
