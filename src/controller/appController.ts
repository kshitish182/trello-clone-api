import { Request, Response } from 'express';

import * as boardServices from '../services/boardServices';

export const board = async (req: Request, res: Response) => {
  const result = await boardServices.createBoard(req.params.id, req.body);
  res.json(result);
};

// export const storeList = async (req: Request, res: Response) => {
//   const result = await appService.storeList(req);
//   res.json('List stored');
// };

// export const storeCard = async (req: Request, res: Response) => {
//   const result = await appService.storeCard(req);
//   res.json(result);
// };
