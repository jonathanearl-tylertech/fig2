import Joi from 'joi';

export default Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required(),

  summary: Joi.string()
    .max(200),
});

