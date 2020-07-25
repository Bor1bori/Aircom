import express from 'express';
import usersRouter from './users';
import authRouter from './auth';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hello');
});

router.use('/users', usersRouter);
router.use('/auth', authRouter);

export default router;
