import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import indexRouter from '@src/routes/index';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: true, // TODO: 나중에 origin whitelist 설정
  credentials: true
}));

app.use('/', indexRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, req: any, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({ description: err.message, success: false });
});

export default app;
