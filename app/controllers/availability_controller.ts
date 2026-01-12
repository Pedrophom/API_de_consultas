import type { HttpContext } from '@adonisjs/core/http'
import Availability from '#models/Availability'
import { availabilityValidator } from '#validators/availability'

export default class AvailabilityController {

  async store({ request, response, auth }: HttpContext) {
    const user = auth.user!

    if (user.tipo !== 'profissional') {
      return response.forbidden({ message: 'Apenas profissionais podem cadastrar horários.' })
    }

    const data = await request.validateUsing(availabilityValidator)

    await user.load('professional')

    const availability = await Availability.create({
      professionalId: user.professional!.id,
      diaDaSemana: data.dia_da_semana,
      horaInicio: data.hora_inicio,
      horaFim: data.hora_fim
    })

    return response.created(availability)
  }

  async index({ params, response }: HttpContext) {
    const horarios = await Availability.query()
      .where('professional_id', params.professional_id)
      .orderBy('dia_da_semana', 'asc') 
      .orderBy('hora_inicio', 'asc')

    return response.ok(horarios)
  }
}