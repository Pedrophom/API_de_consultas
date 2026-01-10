import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Availability from '#models/Availability'
import consultation from '#models/consultation'
import User from '#models/user'


export default class Professional extends BaseModel {
  @column({ isPrimary: true })
    declare id: number

  @column()
    declare userId: number

  @column()
    declare especialidade: string

  @belongsTo(() => User)
    declare user: BelongsTo < typeof User>

  @hasMany(() => Availability)
    declare Availability: HasMany < typeof Availability>

  @hasMany(() => consultation)
    declare consultation: HasMany < typeof consultation>

  @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}