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

export const validationUserId = celebrate({
  body: Joi.object().keys({
    userId: Joi.string().required(),
  }),
});

export const validationUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required(),
  }),
});

export const validationAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlRegExp).required(),
  }),
});

export const validationCardId = celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
});
