import { celebrate, Joi } from "celebrate";
import { urlRegExp, emailRegExp } from "../constants/config";

export const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().pattern(emailRegExp),
    password: Joi.string().required().min(6),
  }),
});

export const validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(urlRegExp),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});
