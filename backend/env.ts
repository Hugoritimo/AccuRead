import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  EMAIL_HOST: Env.schema.string(),
  EMAIL_PORT: Env.schema.number(),
  EMAIL_USER: Env.schema.string(),
  EMAIL_PASS: Env.schema.string(),
})
