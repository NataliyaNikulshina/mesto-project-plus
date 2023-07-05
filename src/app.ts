import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/users";
import cardsRouter from "./routes/cards";
import { createUser, login } from "./controllers/users";
import auth from "./middlewares/auth";
import errorsMiddleware from "./middlewares/errors";
import { errors } from "celebrate";
import { requestLogger, errorLogger } from "./middlewares/logger";

const { PORT = 3000 } = process.env;

const {
  MONGODB_URI = "mongodb://127.0.0.1:27017/mestodb",
} = process.env;

const app = express();

mongoose.connect(MONGODB_URI);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger); // подключаем логер запросов

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);

app.use("/users", userRouter);
app.use("/cards", cardsRouter);

app.use(errorLogger); // подключаем логер ошибок

app.use(errors());
app.use(errorsMiddleware);

app.listen(PORT, () => {
// Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
