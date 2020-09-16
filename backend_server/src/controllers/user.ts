import { wrapper } from '@src/utils/wrapper';
import * as UserServices from '@src/services/user';
/**
 * verifySignin 이후에 사용해야함.
 */
export const getCurrentUserInfo = wrapper(async (req, res) => {
  return res.status(200).json({
    email: req.user!.email,
    signinType: req.user!.signinType,
    signinID: req.user!.signinID,
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
