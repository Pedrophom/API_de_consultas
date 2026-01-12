import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'availability' 

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('professional_id').unsigned().references('id').inTable('professionals').onDelete('CASCADE')
      table.integer('dia_da_semana').notNullable()
      table.string('hora_inicio').notNullable()
      table.string('hora_fim').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}