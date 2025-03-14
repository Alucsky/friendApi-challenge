import { Org } from '@/entities/org'
import { Prisma, Org as PrismaOrg } from '@prisma/client'

export class PrismaOrgMapper {
  static toPrisma(org: Org): Prisma.OrgCreateInput {
    return {
      id: org.id,
      responsableName: org.responsableName,
      email: org.email,
      cep: org.cep,
      address: org.address,
      phoneNumber: org.phoneNumber,
      password_hash: org.password_hash,
    }
  }
  static toDomain(prismaOrg: PrismaOrg): Org {
    return new Org(
      {
        responsableName: prismaOrg.responsableName,
        email: prismaOrg.email,
        cep: prismaOrg.cep,
        address: prismaOrg.address,
        phoneNumber: prismaOrg.phoneNumber,
        password_hash: prismaOrg.password_hash,
      },
      prismaOrg.id
    )
  }
}
