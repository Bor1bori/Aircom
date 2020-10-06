import { wrapper } from '@src/utils/wrapper';
import * as UserServices from '@src/services/user';
import * as PaymentServices from '@src/services/charge';
/**
 * verifySignin 이후에 사용해야함.
 */
export const getCurrentUserInfo = wrapper(async (req, res) => {
  return res.status(200).json({
    email: req.user!.email,
    signinType: req.user!.signinType,
    signinId: req.user!.signinId,
    gender: req.user!.gender,
    birthdate: req.user!.birthdate
  });
});

export const updateCurrentUserInfo = wrapper(async (req, res) => {
  const result = await UserServices.updateUser(req.user!.id, req.body);
  if (result === -1) {
    return res.status(500).json(null); // 발생하지 않음.
  }
  return res.status(200).json(null);
});

export const deleteCurrentUser = wrapper(async (req, res) => {
  try {
    await req.user!.destroy();
  } catch (err) {
    console.log(err);
  }
  res.status(200).json(null);
});

export const getRemainTime = wrapper(async (req, res) => {
  const subscription = await PaymentServices.getActiveSubscription(req.user!);
  const remainTime = req.user!.remainTime;

  return res.status(200).json({
    subscription,
    remainTime
  });
});

export const getSubscription = wrapper(async (req, res) => {
  const subscription = await PaymentServices.getActiveSubscription(req.user!);
  if (subscription) {
    return res.status(200).json({
      subscription
    });
  } else {
    return res.status(404).json({
      err: 'not subscribe now'
    });
  }
});

export const getUsePcs = wrapper(async (req, res) => {
  const usePcs = await UserServices.getUsePcs(req.user!.id);
  return res.status(200).json({
    usePcs
  });
});
