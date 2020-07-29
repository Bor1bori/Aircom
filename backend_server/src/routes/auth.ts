import express from 'express';
import * as authControllers from '@src/controllers/auth';
import * as authMiddleware from '@src/middlewares/auth';

const router = express.Router();

router.post('/signup', authMiddleware.signupValidator, authControllers.signup);

router.post('/signin', authMiddleware.signinValidator, authControllers.signin);

router.get('/oauth/google/authurl', authControllers.getGoogleOAuthURL);
router.get('/oauth/google/callback', authMiddleware.googleOAuthCallbackValidator, authControllers.googleOAuthCallback);
router.post('/oauth/google/signin', authMiddleware.googleOAuthSignValidator, authControllers.googleOAuthSignUpAndSignIn);

export default router;
