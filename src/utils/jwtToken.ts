import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export function verifyToken(accessToken: string) {
  jwt.verify(accessToken, process.env.SECRET_TOKEN_KEY as string, (err) => {
    if (err) {
      return false;
    }
  });

  return true;
}

export function signToken(payload: string) {
  return jwt.sign(payload, process.env.SECRET_TOKEN_KEY as string);
}
