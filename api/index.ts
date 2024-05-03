/// <reference types="../global" />

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import http from "node:http";

import {
  SendResponseMiddleware,
  ErrorHandlerMiddleware
} from "../src/middlewares";

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use(SendResponseMiddleware());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("*", (_, res) => {
  res.sendResponse("error/failed", 404, {
    message: "Endpoint not found!"
  });
});

app.use(ErrorHandlerMiddleware());

export default server;
