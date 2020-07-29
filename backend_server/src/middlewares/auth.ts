import { wrapper } from '@src/utils/wrapper';
import * as yup from 'yup';
import { SignupBody, SigninBody } from '@src/interfaces/auth';

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
    password: yup.string().required(),
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