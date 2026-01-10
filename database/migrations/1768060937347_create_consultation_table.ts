import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'consultations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('patient_id').unsigned().references('patients.id').onDelete('CASCADE')
      table.integer('professional_id').unsigned().references('professionals.id').onDelete('CASCADE')
      
      table.date('data').notNullable()
      table.time('hora').notNullable()
      
      table.enum('status', ['agendada', 'cancelada', 'concluida']).defaultTo('agendada')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}