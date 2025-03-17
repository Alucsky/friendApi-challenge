import { MakeRegisterOrgUseCase } from '@/use-cases/factories/makeRegisterOrgUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function RegisterOrg(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerOrgSchema = z.object({
    responsableName: z.string(),
    email: z.string(),
    cep: z.string(),
    address: z.string(),
    phoneNumber: z.string(),
    password: z.string(),
  })

  const { address, cep, email, password, phoneNumber, responsableName } =
    registerOrgSchema.parse(request.body)

  const registerOrgUseCase = MakeRegisterOrgUseCase()

  await registerOrgUseCase.registerOrg({
    responsableName,
    email,
    cep,
    address,
    phoneNumber,
    password,
  })

  return reply.status(201).send({ message: 'Org registered successfully' })
}
