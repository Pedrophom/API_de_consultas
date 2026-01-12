import vine from '@vinejs/vine'

export const consultationValidator = vine.compile(
  vine.object({
    professional_id: vine.number(),

    data: vine.date({ formats: ['YYYY-MM-DD'] })
      .afterOrEqual('today'), 

    hora: vine.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
  })
)