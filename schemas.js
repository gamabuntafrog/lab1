const Joi = require("joi");

const createEmailSchema = Joi.object({
  theme: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
  theme: Joi.string().min(1).required(),
  to: Joi.object({
    name: Joi.string().min(1).required(),
    address: Joi.string().min(1).required(),
  }),
});

const updateEmailsSchema = Joi.object({
  theme: Joi.string().min(1).optional(),
  description: Joi.string().min(1).optional(),
  theme: Joi.string().min(1).optional(),
  to: Joi.optional({
    name: Joi.string().min(1).optional(),
    address: Joi.string().min(1).optional(),
  }),
});

module.exports = {
  createEmailSchema,
  updateEmailsSchema,
};
