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


  async show({ params }: HttpContext) {
    const user = await User.findBy('id', params.id)
    return user
  }

 
  async update({ params, request }: HttpContext) {
    const user = await User.findBy('id', params.id)
    const {name,password} = await request.validateUsing(updateUserValidator)
    user?.merge({name,password})
    await user?.save()
    return user
  }


  async destroy({ params, response }: HttpContext) {
    const user = await User.findBy('id', params.id)
    await user?.delete()
    return response.status(203)
  }
}