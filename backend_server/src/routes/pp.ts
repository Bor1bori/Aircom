import express from 'express';
import { verifySignin } from '@src/middlewares/pp_auth';
import { updatePPValidator } from '@src/middlewares/pp';
import * as ppMiddlewares from '@src/middlewares/pp';
import * as ppControllers from '@src/controllers/pp';

const router = express.Router();

router.post('/n/pcs', ppMiddlewares.registerPcValidator, ppControllers.registerPc);
router.get('/current', verifySignin, ppControllers.getCurrentPPInfo);
router.put('/current', verifySignin, updatePPValidator, ppControllers.updateCurrentPPInfo);
router.delete('/current', verifySignin, ppControllers.deleteCurrentPP);

export default router;
