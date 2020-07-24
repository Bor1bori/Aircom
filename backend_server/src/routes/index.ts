import express from 'express';
import usersRouter from './users';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hello');
});

router.use('/users', usersRouter);

export default router;
