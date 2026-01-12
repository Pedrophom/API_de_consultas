import type { HttpContext } from '@adonisjs/core/http'
import Consultation from '#models/consultation'
import Availability from '#models/Availability'
import { consultationValidator } from '#validators/consultation'
import { DateTime } from 'luxon'


export default class ConsultationController {

async store({ request, response, auth }: HttpContext) {
    const user = auth.user!
    
    if (user.tipo !== 'paciente') {
      return response.forbidden({ message: 'Apenas pacientes podem agendar.' })
    }

    const payload = await request.validateUsing(consultationValidator)
    
    const dataLuxon = DateTime.fromJSDate(payload.data)

    await user.load('patient')

    const conflito = await Consultation.query()
      .where('professional_id', payload.professional_id)
      .where('data', dataLuxon.toFormat('yyyy-MM-dd'))
      .where('hora', payload.hora)
      .whereNot('status', 'cancelada')
      .first()

    if (conflito) {
      return response.conflict({ message: 'Horário indisponível.' })
    }


    const diaDaSemana = dataLuxon.weekday === 7 ? 0 : dataLuxon.weekday

    const disponivel = await Availability.query()
      .where('professional_id', payload.professional_id)
      .where('dia_da_semana', diaDaSemana)
      .where('hora_inicio', '<=', payload.hora)
      .where('hora_fim', '>', payload.hora)
      .first()

    if (!disponivel) {
      return response.badRequest({ message: 'O médico não atende neste dia/horário.' })
    }

    const consulta = await Consultation.create({
      patientId: user.patient!.id,
      professionalId: payload.professional_id,
      data: dataLuxon,
      hora: payload.hora,
      status: 'agendada'
    })

    return response.created(consulta)
  }

  async index({ auth }: HttpContext) {
    const user = auth.user!
    
    if (user.tipo === 'paciente') {
      await user.load('patient')
      if (!user.patient) return [] 
      
      return Consultation.query()
        .where('patient_id', user.patient.id)
        .preload('professional', (q) => q.preload('user'))
    } else {
      await user.load('professional')
      if (!user.professional) return []

      return Consultation.query()
        .where('professional_id', user.professional.id)
        .preload('patient', (q) => q.preload('user'))
    }
  }

  async update({ params, request, response, auth }: HttpContext) {
    const user = auth.user!
    const consulta = await Consultation.findOrFail(params.id)

    if (consulta.status === 'cancelada') {
      return response.badRequest({ message: 'Não é possível alterar uma consulta cancelada.' })
    }

    await user.load('patient')
    if (user.tipo === 'paciente') {
        if (!user.patient || consulta.patientId !== user.patient.id) {
            return response.forbidden({ message: 'Você não pode alterar a consulta de outro paciente.' })
        }
    }

    const payload = await request.validateUsing(consultationValidator)

    const dataLuxon = DateTime.fromJSDate(payload.data)

    consulta.merge({
      data: dataLuxon, 
      hora: payload.hora
    })

    await consulta.save()

    return response.ok(consulta)
  }

  async destroy({ params, response, auth }: HttpContext) {
    const user = auth.user!
    const consulta = await Consultation.findOrFail(params.id)

    if (user.tipo !== 'paciente') {
        return response.forbidden({ message: 'Apenas pacientes cancelam consultas.' })
    }
    
    await user.load('patient')
    if (consulta.patientId !== user.patient!.id) {
      return response.forbidden({ message: 'Essa consulta não é sua.' })
    }

    consulta.status = 'cancelada'
    await consulta.save()

    return response.ok({ message: 'Consulta cancelada com sucesso' })
  }
}