import Joi from 'joi';

// profile validation schema
export const CreateProfileValidation = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  name: Joi.string()
    .min(3)
    .max(50)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),

  summary: Joi.string()
    .max(200),
});
