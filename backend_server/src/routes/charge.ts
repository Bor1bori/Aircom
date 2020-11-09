import express from 'express';
import { verifySignin } from '@src/middlewares/auth';
import * as chargeMiddlewares from '@src/middlewares/charge';
import * as chargeControllers from '@src/controllers/charge';

const router = express.Router();

/** 할당 */
router.get('/subscription/menus', chargeControllers.getSubscriptionMenus);
router.post('/time', verifySignin, chargeMiddlewares.chargeTimeValidator, chargeControllers.chargeTime);
router.post('/subscription', verifySignin, chargeMiddlewares.SubscribeValidator, chargeControllers.subscribe);

export default router;
