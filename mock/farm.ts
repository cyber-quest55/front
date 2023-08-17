import { Request, Response } from 'express';
import { GetFarmConnectionResponse, GetFarmsResponse } from './data/farm';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {
  'GET /farms': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.status(200).send(GetFarmsResponse);
  },

  'GET /farms/:farmId/central_panel/status': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.status(200).send(GetFarmConnectionResponse);
  },
};
