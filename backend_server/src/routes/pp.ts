import express from 'express';
// import { verifySignin } from '@src/middlewares/pp_auth';
import * as ppMiddlewares from '@src/middlewares/pp';
import * as ppControllers from '@src/controllers/pp';

const router = express.Router();

router.post('/n/pcs', ppMiddlewares.registerPCValidator, ppControllers.registerPC);

export default router;
