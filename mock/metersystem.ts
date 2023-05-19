import { Request, Response } from 'express';
import { GetMeterSystemResponse } from './data/metersystem';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {
  'GET /farms/:farmId/metersystems/': async (req: Request, res: Response) => {
    await waitTime(2000)
    res.status(200).send(GetMeterSystemResponse);
  },
};
