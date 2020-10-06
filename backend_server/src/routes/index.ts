import express from 'express';
import authRouter from './auth';
import ppAuthRouter from './pp_auth';
import ppRouter from './pp';
import usePcRouter from './use_pc';
import userRouter from './user';
import chargeRouter from './charge';

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.send('hello');
});

router.use('/auth', authRouter);
router.use('/pp-auth', ppAuthRouter);
router.use('/pc-providers', ppRouter);
router.use('/use-pcs', usePcRouter);
router.use('/users', userRouter);
router.use('/charge', chargeRouter);

export default router;
