import { Request, Response } from 'express';

import * as boardServices from '../services/boardServices';

// update board

export async function update(req: Request, res: Response) {
  const result = await boardServices.update(req.params.id, req.body);
  res.status(result.status).json(result);
}
