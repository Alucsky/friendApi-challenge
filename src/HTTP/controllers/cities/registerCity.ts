import { MakeRegisterCityUseCase } from '@/use-cases/factories/makeRegisterCityUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function RegisterCity(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerCitySchema = z.object({
    name: z.string().min(3).max(50),
  })

  const { name } = registerCitySchema.parse(request.body)

  const registerCityUseCase = MakeRegisterCityUseCase()

  await registerCityUseCase.registerCity({
    name,
  })

  return reply.status(201).send({ message: 'City registered successfully' })
}
