import { Request, Response } from 'express';
import { GetCentralResponse } from './data/central';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {
  'GET /farms/:farmId/central': async (req: Request, res: Response) => {
    await waitTime(2000)
    res.status(200).send(GetCentralResponse);
  },
};
