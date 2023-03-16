import * as Joi from 'joi';

export const AuthSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required()
})