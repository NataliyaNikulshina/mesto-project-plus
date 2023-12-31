import mongoose from "mongoose";
import { urlRegExp } from "../constants/config";

export interface IUser {
    name: string;
    about: string;
    avatar: string;
    email: string;
    password: string;
  }

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: "Исследователь",
  },
  avatar: {
    type: String,
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    validate: {
      validator: (value: string) => urlRegExp.test(value),
      message: "Некорректный формат ссылки",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => urlRegExp.test(value),
      message: "Некорректный формат ссылки",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export default mongoose.model("user", userSchema);
