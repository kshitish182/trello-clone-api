import { Request, Response } from 'express';

import * as cardServices from '../services/cardServices';

export async function update(req: Request, res: Response) {
  const result = await cardServices.update(req.params.id, req.body);
  res.status(result.status).json(result);
}
