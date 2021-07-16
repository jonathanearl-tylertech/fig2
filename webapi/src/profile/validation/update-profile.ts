import Joi from 'joi';

export const UpdateProfileValidation = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required(),

  summary: Joi.string()
    .max(200),
});

