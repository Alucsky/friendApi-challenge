import {
  Age,
  AnimalSize,
  EnergyLevel,
  Environment,
  IndependenceLevel,
} from 'src/entities/pet'

export interface IFindPetsByCharacteristicsDTO {
  city_id: string
  age?: Age
  animalSize?: AnimalSize
  energyLevel?: EnergyLevel
  independenceLevel?: IndependenceLevel
  environment?: Environment
}
