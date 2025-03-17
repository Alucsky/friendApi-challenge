import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeSearchEspecifyPetUseCase } from '@/use-cases/factories/makeSearchEspecifyPetUseCase'

export async function SearchEspecifyPet(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const searchPetSchema = z.object({
    id: z.string(),
  })

  const { id } = searchPetSchema.parse(request.params)

  const searchPetUseCase = MakeSearchEspecifyPetUseCase()

  const { pet } = await searchPetUseCase.execute({ pet_Id: id })

  return reply.status(201).send({ pet })
}
