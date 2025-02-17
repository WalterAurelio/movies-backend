import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare module 'express-serve-static-core' {
  interface Request {
    email?: string;
    roles?: number[];
  }
}

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const formatedAuthHeader = authHeader as string;
  if (!formatedAuthHeader.startsWith('Bearer ')) return res.sendStatus(401);

  const token = formatedAuthHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
    if (err) return res.sendStatus(403);

    const decodedPayload = decoded as { email: string, roles: number[] };
    req.email = decodedPayload.email;
    req.roles = decodedPayload.roles;
    next();
  });
};