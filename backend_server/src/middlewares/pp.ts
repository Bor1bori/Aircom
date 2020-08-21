import { wrapper } from '@src/utils/wrapper';
import * as yup from 'yup';
import { RegisterPCBody } from '@src/interfaces/pc';

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
