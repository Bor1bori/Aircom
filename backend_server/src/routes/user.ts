import express from 'express';
import { verifySignin } from '@src/middlewares/auth';
import * as UserControllers from '@src/controllers/user';
const router = express.Router();

router.get('/current', verifySignin, UserControllers.getCurrentUserInfo);

export default router;
