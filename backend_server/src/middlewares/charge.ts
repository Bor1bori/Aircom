import { wrapper } from '@src/utils/wrapper';
import { ChargeTimeBody, SubscribeBody } from '@src/interfaces/charge';
import * as yup from 'yup';

export const chargeTimeValidator = wrapper(async (req, res, next) => {
  const callbackSchema = yup.object<ChargeTimeBody>({
    hours: yup.number().min(1).required()
  }).required();

  try {
    await callbackSchema.validate(req.body);
    next();
  } catch (err) {
    return res.status(400).json(err);
  }
});

export const SubscribeValidator = wrapper(async (req, res, next) => {
  const callbackSchema = yup.object<SubscribeBody>({
    subscriptionMenuId: yup.number().required()
  }).required();

  try {
    await callbackSchema.validate(req.body);
    next();
  } catch (err) {
    return res.status(400).json(err);
  }
});
