import { Org } from '@/entities/org'
import { OrgsRepository } from '../orgs-repository'

export class inMemoryOrgsRepos implements OrgsRepository {
  public orgs: Org[] = []
  async findByEmail(email: string): Promise<Org | null> {
    const org = this.orgs.find((org) => {
      return org.email === email
    })
    if (!org) {
      return null
    }
    return org
  }
  async create(org: Org) {
    this.orgs.push(org)
  }

  async findById(id: string) {
    const org = this.orgs.find((org) => {
      return org.id === id
    })

    if (!org) {
      return null
    }

    return org
  }
}
