import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(3),
        email: vine
        .string()
        .email()
        .normalizeEmail()
        .unique(async(db, value)=>{
            const match = await db.from('users').select('id').where('email', value).first()
            return !match
        }),
        password: vine.string().minLength(6),
        tipo: vine.enum(['paciente', 'profissional']),
    })
)

export const updateUserValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(3).optional(),
        password: vine.string().minLength(6).optional(),
    })
)