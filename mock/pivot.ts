import { Request, Response } from 'express';
import {
  GetPivotByIdResponse,
  GetPivotHistoryResponse,
  GetPivotReportResponse,
  GetPivotsInformationResponse,
  GetPivotsResponse,
} from './data/pivot';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {
  'GET /farms/:farmId/pivots/light': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.status(200).send(GetPivotsResponse);
  },

  'GET /farms/:farmId/pivots/paginated/': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.status(200).send(GetPivotsInformationResponse);
  },

  'GET /farms/:farmId/pivots/:pivotId/history/': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.status(200).send(GetPivotHistoryResponse);
  },

  'GET /farms/:farmId/pivots/:pivotId/report/': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.status(200).send(GetPivotReportResponse);
  },

  'GET /farms/:farmId/pivots/:pivotId/': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.status(200).send(GetPivotByIdResponse);
  },
};
