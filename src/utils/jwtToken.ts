import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export function verifyToken(accessToken: string) {
  return jwt.verify(accessToken, process.env.SECRET_TOKEN_KEY as string);
}

export function signToken(payload: string) {
  return jwt.sign(payload, process.env.SECRET_TOKEN_KEY as string);
}
