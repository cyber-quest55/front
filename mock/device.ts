import { Request, Response } from 'express';
import { GetDeviceHistoryResponse, GetDeviceReportResponse } from './data/device';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {
  'GET /farms/:farmId/deviceReport/': async (req: Request, res: Response) => {
    await waitTime(2000)
    res.status(200).send(GetDeviceReportResponse);
  },
  'GET /farms/:farmId/history/device/': async (req: Request, res: Response) => {
    await waitTime(2000)
    res.status(200).send(GetDeviceHistoryResponse);
  },
};

 
