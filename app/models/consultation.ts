import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Patient from '#models/patient'
import Professional from '#models/professional'

export default class consultation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare patientId: number

  @column()
  declare professionalId: number

  @column.date()
  declare data: DateTime

  @column()
  declare hora: string

  @column()
  declare status: 'agendada' | 'cancelada' | 'concluida'

  @belongsTo(() => Patient)
  declare patient: BelongsTo<typeof Patient>

  @belongsTo(() => Professional)
  declare professional: BelongsTo<typeof Professional>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}