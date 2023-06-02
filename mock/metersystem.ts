import { Request, Response } from 'express';
import {
  GetMeterSystemByIdResponse,
  GetMeterSystemHistoryResponse,
  GetMeterSystemResponse,
  GetMeterSystemTableResponse,
  GetMeterSystemWaterLevelResponse,
} from './data/metersystem';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {
  'GET /farms/:farmId/metersystems/': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.status(200).send(GetMeterSystemResponse);
  },

  'GET /farms/:farmId/metersystems/${meterId}/': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.status(200).send(GetMeterSystemByIdResponse);
  },

  'GET /farms/:farmId/meter/${meterId}/history/': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.status(200).send(GetMeterSystemHistoryResponse);
  },

  'GET /farms/:farmId/meter/${meterId}/lake-level/': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.status(200).send(GetMeterSystemWaterLevelResponse);
  },

  'GET /farms/:farmId/meter/${meterId}/water-level-history/': async (
    req: Request,
    res: Response,
  ) => {
    await waitTime(2000);
    res.status(200).send(GetMeterSystemTableResponse);
  },
};
