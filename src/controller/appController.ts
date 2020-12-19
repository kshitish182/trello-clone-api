import { Request, Response } from 'express';

import * as listServices from '../services/listServices';
import * as cardServices from '../services/cardServices';
import * as boardServices from '../services/boardServices';

export const board = async (req: Request, res: Response) => {
  const result = await boardServices.createBoard(req.params.id, req.body);
  res.json(result);
};

export const createCardController = async (req: Request, res: Response) => {
  const result = await cardServices.createCard(req.params.id, req.body);
  res.status(result.status).json(result);
};

export const createListController = async (req: Request, res: Response) => {
  const result = await listServices.createList(req.params.id, req.body);
  res.status(result.status).json(result);
};

// export const storeList = async (req: Request, res: Response) => {
//   const result = await appService.storeList(req);
//   res.json('List stored');
// };

// export const storeCard = async (req: Request, res: Response) => {
//   const result = await appService.storeCard(req);
//   res.json(result);
// };
