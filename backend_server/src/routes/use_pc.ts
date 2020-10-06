import express from 'express';
import { verifySignin as verifyUserSignin } from '@src/middlewares/auth';
import * as usePcControllers from '@src/controllers/use_pc';

const router = express.Router();

/** 할당 */
router.post('/', verifyUserSignin, usePcControllers.usePc);
router.delete('/current', verifyUserSignin, usePcControllers.endUse);

export default router;
