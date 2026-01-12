import type { HttpContext } from '@adonisjs/core/http'
import consultation from '#models/consultation'
import User from '#models/user'
export default class ConsultasController {

  async store({ request,auth }: HttpContext) {
    const user = auth.user as User
    if (!user){
      return { error: 'Usuário não autenticado.' }
    }
    if(user.tipo !== 'paciente'){
      return { error: 'Apenas pacientes podem agendar consultas.' }
    }

    const {professionalId, diaDaSemana, horaInicio, horaFim} = request.only(['professionalId', 'diaDaSemana', 'horaInicio', 'horaFim'])

    const conflito = await consultation.query()
      .where('professionalId', professionalId)
      .andWhere('diaDaSemana', diaDaSemana)
      .andWhere('horaInicio', '<=', horaInicio)
      .andWhere('horaFim', '>=', horaFim)
      .first()
    if (conflito){
      return { error: 'Conflito de agendamento. Já existe uma consulta marcada nesse horário.' }
    }
    return consultation.create({
      patientId: user.id,
      professionalId: professionalId,
      data: diaDaSemana,
      hora: horaInicio + ' - ' + horaFim,
      status: 'agendada',
    })
  }


   public async destroy({ auth, params }: HttpContext) {
    const consulta = await consultation.findOrFail(params.id)
    if (!auth.user) {
      return { erro: 'Usuário não autenticado' }
    }
    
    const user = auth.user as User
    if (consulta.patientId !== user.id) {
      return { erro: 'Não autorizado' }
    }

    consulta.status = 'cancelada'
    await consulta.save()

    return consulta
  }
}