import { Request, Response } from 'express';
import { GetPivotsInformationResponse, GetPivotsResponse } from './data/pivot';
import { GetPivotReportResponse } from './data/device';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {
  'GET /farms/:farmId/pivotReport/': async (req: Request, res: Response) => {
    await waitTime(2000)
    res.status(200).send(GetPivotReportResponse);
  },

  'GET /farms/:farmId/pivots/light': async (req: Request, res: Response) => {
    await waitTime(2000)
    res.status(200).send(GetPivotsResponse);
  },

  'GET /farms/:farmId/pivots/paginated/': async (req: Request, res: Response) => {
    await waitTime(2000)
    res.status(200).send(GetPivotsInformationResponse);
  },
};
