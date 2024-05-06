import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';

const JoiPassword = Joi.extend(joiPasswordExtendCore);

export type RegisterBody = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: JoiPassword.string()
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .onlyLatinCharacters()
    .doesNotInclude(['password'])
    .required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.only': '"repeatPassword" must match "password"',
  }),
}).required();

export type LoginBody = {
  email: string;
  password: string;
};

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).required();
