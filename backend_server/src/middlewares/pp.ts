import { wrapper } from '@src/utils/wrapper';
import * as yup from 'yup';
import { RegisterPCBody } from '@src/interfaces/pc';
import { UpdatePPBody } from '@src/interfaces/pp';

export const registerPCValidator = wrapper(async (req, res, next) => {
  const registerPCSchema = yup.object<RegisterPCBody>({
    authToken: yup.string().required(),
    ip: yup.string().matches(/(?:[0-9]{1,3}\.){3}[0-9]{1,3}/).required(),
    port: yup.number().max(65535)
  }).required();

  try {
    await registerPCSchema.validate(req.body);
    next();
  } catch (err) {
    return res.status(400).json(err);
  }
});

export const updatePPValidator = wrapper(async (req, res, next) => {
  const updatePPSchema = yup.object<UpdatePPBody>({
    password: yup.string(),
    birthdate: yup.date().max(new Date()),
    gender: yup.string().matches(/(male|female|etc)/)
  }).required();

  try {
    await updatePPSchema.validate(req.body);
    const filteredBody: any = {};
    Object.keys(req.body).filter(value => ['password', 'birthdate', 'gender'].includes(value))
      .forEach(filteredKey => {
        filteredBody[filteredKey] = req.body[filteredKey];
      });
    req.body = filteredBody;
    next();
  } catch (err) {
    return res.status(400).json(err);
  }
});
