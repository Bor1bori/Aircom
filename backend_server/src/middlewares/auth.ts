import { wrapper } from '@src/utils/wrapper';
import * as yup from 'yup';
import { SignupBody, SigninBody } from '@src/interfaces/auth';
import { jwtVerify } from '@src/utils/crypto';
import { User } from '@src/db/models/user';

export const signupValidator = wrapper(async (req, res, next) => {
  const signupSchema = yup.object<SignupBody>({
    email: yup.string().email().required(),
    password: yup.string().required(),
    birthdate: yup.date().max(new Date()).required(),
    gender: yup.string().matches(/(male|female|etc)/).required()
  }).required();

  try {
    await signupSchema.validate(req.body);
    next();
  } catch (err) {
    return res.status(400).json(err);
  }
});

export const signinValidator = wrapper(async (req, res, next) => {
  const signinSchema = yup.object<SigninBody>({
    email: yup.string().email().required(),
    password: yup.string().required()
  }).required();

  try {
    await signinSchema.validate(req.body);
    next();
  } catch (err) {
    return res.status(400).json(err);
  }
});

export const googleOAuthCallbackValidator = wrapper(async (req, res, next) => {
  const callbackSchema = yup.object({
    code: yup.string().required()
  }).required();

  try {
    await callbackSchema.validate(req.query);
    next();
  } catch (err) {
    return res.status(400).json(err);
  }
});

export const googleOAuthSignValidator = wrapper(async (req, res, next) => {
  const callbackSchema = yup.object({
    idToken: yup.string().required()
  }).required();

  try {
    await callbackSchema.validate(req.body);
    next();
  } catch (err) {
    return res.status(400).json(err);
  }
});

export const verifySignin = wrapper(async (req, res, next) => {
  let loginToken = req.cookies.loginToken;
  if (req.get('loginToken')) {
    loginToken = req.get('loginToken');
  }
  const decoded = jwtVerify(loginToken);
  if (decoded === -1 || decoded === -2) {
    return res.status(401).json({ err: decoded === 1 ? 'expired token' : 'invalid token' });
  }
  const user = await User.findByPk(decoded.id);

  if (!user) {
    throw new Error('not valid id in decoded token');
  }

  // controller에서 user 이용할 수 있도록 req에 넣어줌
  req.user = user;
  next();
});
