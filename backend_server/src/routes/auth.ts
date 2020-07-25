import express from 'express';
import * as authControllers from '@src/controllers/auth';

const router = express.Router();

router.post('/signup', authControllers.signup);

router.post('/signin', authControllers.signin);

export default router;
