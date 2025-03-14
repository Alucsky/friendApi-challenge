import { prisma } from '@/lib/prisma'
import { OrgsRepository } from '../orgs-repository'
import { Org } from '@/entities/org'
import { PrismaOrgMapper } from './mappers/prisma-org-mapper'

export class PrismaOrgsRepository implements OrgsRepository {
  async findByEmail(email: string) {
    const raw = await prisma.org.findUnique({
      where: {
        email,
      },
    })
    if (!raw) {
      return null
    }
    return PrismaOrgMapper.toDomain(raw)
  }
  async findById(id: string) {
    const raw = await prisma.org.findUnique({
      where: {
        id,
      },
    })
    if (!raw) {
      return null
    }
    return PrismaOrgMapper.toDomain(raw)
  }
  async create(org: Org) {
    const data = PrismaOrgMapper.toPrisma(org)

    await prisma.org.create({
      data,
    })
  }
}
