import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Professional from '#models/professional'

export default class Availability extends BaseModel {
  public static table = 'availability' 

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare professionalId: number

  @column()
  declare diaDaSemana: number

  @column()
  declare horaInicio: string

  @column()
  declare horaFim: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Professional)
  declare professional: BelongsTo<typeof Professional>
}