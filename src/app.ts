import express from "express";
import mongoose from "mongoose";
import router from "./routes/users";
// import auth from "./middlewares/auth";

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");
app.use(express.json());
app.use("/", router);

app.use((req, res, next) => {
  req.user = {
    _id: "64a0ab5d3ec214c74c4a8a11",
  };

  next();
});

app.listen(PORT, () => {
// Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
