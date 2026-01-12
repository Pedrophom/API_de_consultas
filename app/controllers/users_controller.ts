import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/register_user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {

  async index() {
    const users = await User.all()
    return users
  }

  async store({ request }: HttpContext) {
    const {name, email, password,tipo} = await request.validateUsing(createUserValidator)
    const user = await User.create({
      name,
      email,
      password,
      tipo,
    })
    return user
  }


  async show({ params, response }: HttpContext) {
    try {
      const user = await User.findByOrFail('id', params.id)
      return user
    } catch (error) {
     return response.status(404).json({message: 'Usuário não encontrado'}) 
    }

  }

 
  async update({ params, request, response }: HttpContext) {


    try {
      const user = await User.findByOrFail('id', params.id)
      const {name,password} = await request.validateUsing(updateUserValidator)
      user?.merge({name,password})
      await user?.save()
      return user
    } catch (error) {
      return response.status(404).json({message: 'Usuário não encontrado'})
    }
  }


  async destroy({ params, response }: HttpContext) {
    try {
    const user = await User.findBy('id', params.id)
    await user?.delete()
    return response.status(203)
  } catch (error) {
    return response.status(404).json({message: 'Usuário não encontrado'})
  }
  }
}