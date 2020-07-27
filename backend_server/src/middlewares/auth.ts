import { wrapper } from '@src/utils/wrapper';
import * as yup from 'yup';
import { SignupBody, SigninBody } from '@src/interfaces/auth';
import { signup } from '@src/services/auth';

export const signupValidator = wrapper(async (req, res, next) => {

  const signupSchema: yup.ObjectSchema<SignupBody> = yup.object({
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
  
  const signinSchema: yup.ObjectSchema<SigninBody> = yup.object({
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
