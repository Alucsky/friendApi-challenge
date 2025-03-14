import {
  Pet,
  Age,
  AnimalSize,
  EnergyLevel,
  Environment,
  IndependenceLevel,
} from '@/entities/pet'
import { $Enums, Prisma, Pet as PrismaPet } from '@prisma/client'

export class PrismaPetMapper {
  static toPrisma(pet: Pet): Prisma.PetCreateInput {
    return {
      id: pet.id,
      name: pet.name,
      about: pet.about,
      age: pet.age,
      animalSize: pet.animalSize,
      energyLevel: pet.energyLevel,
      independenceLevel: pet.independenceLevel,
      environment: pet.environment,
      pictures: pet.pictures,
      required: pet.required,
      adopted: pet.adopted,
      city: {
        connect: { id: pet.city_id },
      },
      org: {
        connect: { id: pet.org_id },
      },
    }
  }

  static toDomain(prismaPet: PrismaPet): Pet {
    return new Pet(
      {
        name: prismaPet.name,
        about: prismaPet.about,
        age: prismaPet.age as Age,
        animalSize: prismaPet.animalSize as AnimalSize,
        energyLevel: prismaPet.energyLevel as EnergyLevel,
        independenceLevel: prismaPet.independenceLevel as IndependenceLevel,
        environment: prismaPet.environment as Environment,
        pictures: prismaPet.pictures,
        required: prismaPet.required,
        adopted: prismaPet.adopted,
        city_id: prismaPet.city_id,
        org_id: prismaPet.org_id,
      },
      prismaPet.id
    )
  }
}
