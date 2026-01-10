import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = request.only(['nome', 'email', 'password', 'tipo', 'especialidade'])

    const user = await User.create({
      name: data.nome,
      email: data.email,
      password: data.password,
      tipo: data.tipo as 'paciente' | 'profissional',
    })

    if (data.tipo === 'profissional') {
      if (!data.especialidade) {
        return response.badRequest({ message: 'A especialidade para os profissionais é obrigatória' })
      }
      await user.related('professional').create({
        especialidade: data.especialidade
      })
    } else {
      await user.related('patient').create({})
    }

    return response.created({ message: 'User criado com sucesso!!!', user })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)
      const token = await User.accessTokens.create(user)

      return response.ok({
        type: 'bearer',
        token: token.value!.release(),
        user: { id: user.id, nome: user.name, email: user.email, tipo: user.tipo }
      })
    } catch {
      return response.unauthorized({ message: 'Credenciais estão inválidas' })
    }
  }
}