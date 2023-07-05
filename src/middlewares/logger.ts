import winston from "winston";
import expressWinston from "express-winston";
import "winston-daily-rotate-file";

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.DailyRotateFile({
      filename: "request-%DATE%.log",
      datePattern: "HH-DD-MM-YYYY",
      maxFiles: 10,
    }),
  ],
  format: winston.format.json(),
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.DailyRotateFile({
      filename: "error-%DATE%.log",
      datePattern: "HH-DD-MM-YYYY",
      maxFiles: 10,
    }),
  ],
  format: winston.format.json(),
});
