import { randomUUID } from 'node:crypto'

interface OrgProps {
  responsableName: string
  email: string
  cep: string
  address: string
  phoneNumber: string
  password_hash: string
}

export class Org {
  protected _id: string
  protected props: OrgProps

  constructor(props: OrgProps, id?: string) {
    this._id = id || randomUUID()
    this.props = props
  }

  get id() {
    return this._id
  }

  get responsableName() {
    return this.props.responsableName
  }
  set responsableName(name: string) {
    this.props.responsableName = name
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  get cep() {
    return this.props.cep
  }
  set cep(cep: string) {
    this.props.cep = cep
  }

  get address() {
    return this.props.address
  }
  set address(address: string) {
    this.props.address = address
  }

  get phoneNumber() {
    return this.props.phoneNumber
  }
  set phoneNumber(phoneNumber: string) {
    this.props.phoneNumber = phoneNumber
  }

  get password_hash() {
    return this.props.password_hash
  }
  set password_hash(password_hash: string) {
    this.props.password_hash = password_hash
  }
}
