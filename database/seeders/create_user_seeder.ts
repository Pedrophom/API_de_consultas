import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      name: 'Victor',
      email: 'victor@gmail.com',
      password:'654321',
      tipo:'profissional',
    })
  }
}