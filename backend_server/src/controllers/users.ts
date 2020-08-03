import express from 'express';
import { wrapper } from '@src/utils/wrapper';

/* GET users listing. */
export const getUsers = wrapper(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.send('respond with a resource');
});

