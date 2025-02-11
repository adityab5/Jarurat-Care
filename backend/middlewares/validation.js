import Joi from "joi";

export const validateEntry = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().max(255),
    description: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validateUser = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().max(255),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    role: Joi.string().valid("admin", "user"),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
