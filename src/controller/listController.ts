import { Request, Response } from 'express';

import * as listServices from '../services/listServices';

export async function update(req: Request, res: Response) {
  const result = await listServices.update(req.params.id, req.body);
  res.status(result.status).json(result);
}
