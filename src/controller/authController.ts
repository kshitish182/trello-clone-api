import { Response, Request } from 'express';
import * as authService from '../services/authServices';

export const loginController = async (req: Request, res: Response) => {
  const result = await authService.loginService(req.body);
  res.json(result);
};

export const registerController = async (req: Request, res: Response) => {
  const result = await authService.registerService(req.body);
  res.json(result);
};

export const tokenController = async (req: Request, res: Response) => {
  const result = await authService.verifyJwtToken(req.body);
  res.status(result.status).json(result);
};
