import { makeAuthenticateOrgUseCase } from '@/use-cases/factories/makeAuthenticateOrgUseCase'
import { MakeRegisterOrgUseCase } from '@/use-cases/factories/makeRegisterOrgUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function AuthenticateOrg(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerOrgSchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  const { email, password } = registerOrgSchema.parse(request.body)

  const authenticateOrgUseCase = makeAuthenticateOrgUseCase()

  await authenticateOrgUseCase.execute({
    email,
    password,
  })

  return reply.status(201).send({ message: 'Org registered successfully' })
}
