import { Request, Response } from 'express';
import { getPivotByIdResponse } from './data/pivot';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {

  'GET /farms/313/pivots/light': (req: Request, res: Response) => {
    waitTime(200)
    res.status(200).send(getPivotByIdResponse);
  },

};
