import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import userRouter from "./routes/users";
import cardsRouter from "./routes/cards";
import { createUser, login } from "./controllers/users";
import auth from "./middlewares/auth";
import { STATUS_NOT_FOUND, STATUS_SERVER_ERROR } from "./constants/status-code";
import { Error } from "./types/types";

const { PORT = 3000 } = process.env;

const {
  MONGODB_URI = "mongodb://127.0.0.1:27017/mestodb",
} = process.env;

const app = express();

mongoose.connect(MONGODB_URI);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);

app.use("/users", userRouter);
app.use("/cards", cardsRouter);

app.use((req: Request, res: Response) => {
  res.status(STATUS_NOT_FOUND).send({ message: "Страница не найдена" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = STATUS_SERVER_ERROR, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === STATUS_SERVER_ERROR ? "На сервере произошла ошибка" : message,
    });
  next();
});

app.listen(PORT, () => {
// Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
