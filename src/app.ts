import express from "express";
import mongoose from "mongoose";
import { errors } from "celebrate";
import router from "./routes/index";
import { createUser, login } from "./controllers/users";
import auth from "./middlewares/auth";
import errorsMiddleware from "./middlewares/errors";
import { validationLogin, validationCreateUser } from "./middlewares/validator";
import { requestLogger, errorLogger } from "./middlewares/logger";

const {
  MONGODB_URI = "mongodb://127.0.0.1:27017/mestodb",
  PORT = 3000,
} = process.env;

const app = express();

mongoose.connect(MONGODB_URI);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger); // подключаем логер запросов

app.post("/signin", validationLogin, login);
app.post("/signup", validationCreateUser, createUser);

app.use(auth);

app.use("/", router);

app.use(errorLogger); // подключаем логер ошибок

app.use(errors());
app.use(errorsMiddleware);

app.listen(PORT);
