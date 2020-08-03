import express from 'express';
import authRouter from './auth';

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.send('hello');
});

router.use('/auth', authRouter);

export default router;
