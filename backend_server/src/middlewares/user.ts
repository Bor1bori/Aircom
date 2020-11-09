import { wrapper } from '@src/utils/wrapper';
import * as yup from 'yup';
import { UpdateUserBody } from '@src/interfaces/user';

export const updateUserValidator = wrapper(async (req, res, next) => {
  const updateUserSchema = yup.object<UpdateUserBody>({
    password: yup.string(),
    birthdate: yup.date().max(new Date()),
    gender: yup.string().matches(/(male|female|etc)/)
  }).required();

  try {
    await updateUserSchema.validate(req.body);
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
