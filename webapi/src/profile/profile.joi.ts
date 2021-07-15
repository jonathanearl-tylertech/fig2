import Joi from 'joi';

// profile validation schema
export const ProfileValidation = Joi.object({
  id: Joi.string(),

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

  createdAt: Joi.date(),
  modifiedAt: Joi.date()
});

export const UpdateProfileValidation = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required(),

  summary: Joi.string()
    .max(200),
});

