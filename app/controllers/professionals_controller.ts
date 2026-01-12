import type { HttpContext } from '@adonisjs/core/http'
import Professional from '#models/professional'

export default class ProfessionalsController {

  async index({}: HttpContext) {
    return Professional.all()
  }

  async store({ request,auth }: HttpContext) {
    const user = auth.user!
    if(user.tipo !== 'profissional'){
      return { error: 'Apenas profissionais podem criar perfis profissionais.' }
    }
    return Professional.create({
      userId: user.id,
      especialidade: request.input('especialidade'),
  })  }


}