import { wrapper } from '@src/utils/wrapper';

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
