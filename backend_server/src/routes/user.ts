import express from 'express';
import { verifySignin } from '@src/middlewares/auth';
import { updateUserValidator } from '@src/middlewares/user';
import * as UserControllers from '@src/controllers/user';
const router = express.Router();

router.get('/current', verifySignin, UserControllers.getCurrentUserInfo);
router.put('/current', verifySignin, updateUserValidator, UserControllers.updateCurrentUserInfo);
router.delete('/current', verifySignin, UserControllers.deleteCurrentUser);

export default router;
