import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import consultation from '#models/consultation'

export default class Patient extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
    declare userId: number

  @belongsTo(() => User)
    declare user: BelongsTo<typeof User>

  @hasMany(() => consultation)
    declare consultation: HasMany<typeof consultation>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}