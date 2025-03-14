import { randomUUID } from 'node:crypto'

interface CityProps {
  name: string
}

export class City {
  protected _id: string
  protected props: CityProps

  constructor(props: CityProps, id?: string) {
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
}
