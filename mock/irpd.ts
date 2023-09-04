import { Request, Response } from 'express';
import {
  GetIrpdByIdResponse,
  GetIrpdEventsResponse,
  GetIrpdHistoryResponse,
  GetIrpdResponse,
  GetIrpdWaterComsumptionResponse,
} from './data/irpd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {
  'GET /farms/:farmId/irpd/': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.status(200).send(GetIrpdResponse);
  },

  'GET /farms/:farmId/irpds/:irpdId/': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.status(200).send(GetIrpdByIdResponse);
  },

  'GET /farms/:farmId/irpds/:irpdId/history/': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.status(200).send(GetIrpdHistoryResponse);
  },

  'GET /farms/:farmId/irpds/:irpdId/water-consumption/:waterId/': async (
    req: Request,
    res: Response,
  ) => {
    await waitTime(2000);
    res.status(200).send(GetIrpdWaterComsumptionResponse);
  },

  'GET /farms/:farmId/reports/irpds/:irpdId/irpd-list': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.status(200).send(GetIrpdEventsResponse);
  },
};
