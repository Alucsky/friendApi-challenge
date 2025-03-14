import { randomUUID } from 'node:crypto'

export enum Age {
  PUPPY = 'PUPPY',
  YOUNG = 'YOUNG',
  ADULT = 'ADULT',
  SENIOR = 'SENIOR',
}

export enum AnimalSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  XLARGE = 'XLARGE',
}

export enum EnergyLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum IndependenceLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum Environment {
  INDOOR = 'INDOOR',
  OUTDOOR = 'OUTDOOR',
  BOTH = 'BOTH',
}

interface PetProps {
  name: string
  about: string
  age: Age
  animalSize: AnimalSize
  energyLevel: EnergyLevel
  independenceLevel: IndependenceLevel
  environment: Environment
  pictures: string[]
  required: string[]
  adopted: boolean
  city_id: string
  org_id: string
}

export class Pet {
  protected _id: string
  protected props: PetProps

  constructor(props: PetProps, id?: string) {
    this._id = id || randomUUID()
    this.props = props
  }

  get id() {
    return this._id
  }

  get name() {
    return this.props.name
  }
  set name(name: string) {
    this.props.name = name
  }

  get about() {
    return this.props.about
  }
  set about(about: string) {
    this.props.about = about
  }

  get age() {
    return this.props.age
  }
  set age(age: Age) {
    this.props.age = age
  }

  get animalSize() {
    return this.props.animalSize
  }
  set animalSize(animalSize: AnimalSize) {
    this.props.animalSize = animalSize
  }

  get energyLevel() {
    return this.props.energyLevel
  }
  set energyLevel(energyLevel: EnergyLevel) {
    this.props.energyLevel = energyLevel
  }

  get independenceLevel() {
    return this.props.independenceLevel
  }
  set independenceLevel(independenceLevel: IndependenceLevel) {
    this.props.independenceLevel = independenceLevel
  }

  get environment() {
    return this.props.environment
  }
  set environment(environment: Environment) {
    this.props.environment = environment
  }

  get pictures() {
    return this.props.pictures
  }
  set pictures(pictures: string[]) {
    this.props.pictures = pictures
  }

  get required() {
    return this.props.required
  }
  set required(required: string[]) {
    this.props.required = required
  }

  get adopted() {
    return this.props.adopted
  }
  set adopted(adopted: boolean) {
    this.props.adopted = adopted
  }

  get city_id() {
    return this.props.city_id
  }
  set city_id(city_id: string) {
    this.props.city_id = city_id
  }

  get org_id() {
    return this.props.org_id
  }
  set org_id(org_id: string) {
    this.props.org_id = org_id
  }
}
