import { Response, Request } from 'express';
import * as authService from '../services/authServices';

export const loginController = (req: Request, res: Response) => {
  const result = authService.loginService(req.body);
  res.send(result);
};

export const registerController = (req: Request, res: Response) => {
  const result = authService.registerService(req.body);
  res.send(result);
};
