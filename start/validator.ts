import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({

  'required': 'O campo {{ field }} precisa ser preenchido',
  'string': 'O valor de {{ field }} precisa ser uma String',
  'email.required': 'O email é obrigatório para criar uma conta',
  'email': 'Este não é um email válido',
  'unique': 'O valor de {{ field}} já está em uso',
  'database.unique': 'O valor de {{ field}} já está em uso',
  'minLength': 'O valor de {{ field }} precisa ter no mínimo {{ options.minLength }} caracteres',

  'username.required': 'Por favor, escolha um nome de usuário para sua conta',
  'enum': 'O campo {{ field }} deve ser um valor válido',
  'type.enum': 'O tipo deve ser profissional ou paciente',
})
