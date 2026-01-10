import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'Availabilitys'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('professional_id').unsigned().references('professionals.id').onDelete('CASCADE')

      table.integer('dia_da_semana').notNullable()
      table.time('horario_de_inicio').notNullable()
      table.time('horario_de_fim').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}