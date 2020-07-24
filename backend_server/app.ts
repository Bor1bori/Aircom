import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { sequelizeInit } from '@src/db/sequelize';

import indexRouter from '@src/routes/index';


sequelizeInit();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

app.use((err: any, req: any, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({description: err.message, success: false});
});

export default app;
