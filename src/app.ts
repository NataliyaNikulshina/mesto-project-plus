import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import userRouter from "./routes/users";
import cardsRouter from "./routes/cards";
// import auth from "./middlewares/auth";
import { STATUS_NOT_FOUND, STATUS_SERVER_ERROR } from "./constants/status-code";

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "64a0ab5d3ec214c74c4a8a11",
  };

  next();
});

app.use("/users", userRouter);
app.use("/cards", cardsRouter);

app.use((req: Request, res: Response) => {
  res.status(STATUS_NOT_FOUND).send({ message: "Страница не найдена" });
});

export type Error = {
  statusCode: number;
  message: string;
};

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
