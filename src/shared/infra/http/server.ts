import { CelebrateError, errors } from "celebrate";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";

import AppError from "@shared/errors/AppErrors";
import swaggerDoc from "@shared/infra/api-schema.json";

import "dotenv/config";
import "express-async-errors";

import "reflect-metadata";
import DataBase from "@shared/infra/typeorm/";

import routes from "./routes";

import "@shared/container";

const dataBase = new DataBase();
dataBase.conecta().then(() => console.log("DB Connected"));

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof CelebrateError) {
      return response.status(400).json({
        status: "error",
        message: "Existe alguma informação invalida no Formulario",
      });
    }

    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    console.log(err);

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

app.listen(process.env.PORT, () => console.log("Server is running!"));
