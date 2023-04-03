import { Request, Response } from 'express';
import { GetPivotByIdResponse } from './data/pivot';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {

  'GET /farms/:farmId/pivots/light': async (req: Request, res: Response) => {
    await waitTime(2000)
    res.status(200).send(GetPivotByIdResponse);
  },

};
