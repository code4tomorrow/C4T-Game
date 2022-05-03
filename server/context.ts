import type { IncomingMessage, ServerResponse } from "h3";
import { prisma } from "../prisma/client";
import type { AuthState } from "../utils/jwt";
import { decodeJwt } from "../utils/jwt";

export type Context = {
  auth: AuthState;
  prisma: typeof prisma;
  req: IncomingMessage;
  res: ServerResponse
};

export const contextFactory = (token: string, req:IncomingMessage, res:ServerResponse): Context => {
  return { auth: decodeJwt(token), prisma, req, res };
};