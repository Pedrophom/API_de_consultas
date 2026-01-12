import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Professional from '#models/professional'

export default class ProfessionalController {

  async index({ response }: HttpContext) {
    const doctors = await User.query()
      .where('tipo', 'profissional')
      .preload('professional')
    
    return response.ok(doctors)
  }

  async show({ params, response }: HttpContext) {
    try {
      const doctor = await Professional.query()
        .where('id', params.id)
        .preload('user')
        .firstOrFail()
      
      return response.ok(doctor)
    } catch {
      return response.notFound({ message: 'Profissional não encontrado' })
    }
  }
}