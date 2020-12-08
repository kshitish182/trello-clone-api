import { Request, Response } from 'express';

import * as appService from '../services/appServices';

export const board = async (req: Request, res: Response) => {
  const result = await appService.storeBoard(req.body);
  res.json(result);
};

export const getBoard = async (req: Request, res: Response) => {
  const result = await appService.getBoards();
  res.json(result);
};
