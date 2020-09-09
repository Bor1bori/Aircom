import express from 'express';
import * as PPAuthControllers from '@src/controllers/pp_auth';
import * as PPAuthMiddlewares from '@src/middlewares/pp_auth';

const router = express.Router();

router.post('/signup', PPAuthMiddlewares.signupValidator, PPAuthControllers.signup);

router.post('/signin', PPAuthMiddlewares.signinValidator, PPAuthControllers.signin);

router.post('/oauth/google/signin', PPAuthMiddlewares.googleOAuthSignValidator, PPAuthControllers.googleOAuthSignUpAndSignIn);

router.get('/auth-token', PPAuthMiddlewares.verifySignin, PPAuthControllers.getAuthToken);

export default router;
