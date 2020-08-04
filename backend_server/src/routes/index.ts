import express from 'express';
import authRouter from './auth';
import ppAuthRouter from './pp_auth';

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.send('hello');
});

router.use('/auth', authRouter);
router.use('/pp-auth', ppAuthRouter);

export default router;
