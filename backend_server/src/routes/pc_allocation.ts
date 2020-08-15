import express from 'express';
import { verifySignin as verifyUserSignin } from '@src/middlewares/auth';
import * as pcAllocationControllers from '@src/controllers/pc_allocation';

const router = express.Router();

/** 할당 */
router.post('/', verifyUserSignin, pcAllocationControllers.allocatePC);
router.delete('/current', verifyUserSignin, pcAllocationControllers.unallocatePC);

export default router;
