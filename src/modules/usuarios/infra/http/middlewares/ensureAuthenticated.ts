import authConfig from "@config/auth";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import AppError from "@shared/errors/AppErrors";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Ausencia de Token", 401);
  }

  const [, token] = authHeader.split(" ");

  const { secret } = authConfig.jwt;

  try {
    const decoded = verify(token, secret);

    const { sub } = decoded as ITokenPayload;

    request.usuario = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError("Token Invalido", 401);
  }
}
