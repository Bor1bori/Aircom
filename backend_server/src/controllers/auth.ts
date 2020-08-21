import { wrapper } from '@src/utils/wrapper';
import * as AuthServices from '@src/services/auth';

export const signup = wrapper(async (req, res) => {
  const user = await AuthServices.signup(req.body);

  if (user === null) {
    // 중복된 이메일
    res.status(409).json({ err: 'duplicated email' });
  } else {
    const loginToken = await AuthServices.signin(req.body);
    // 방금 만든 계정으로 로그인하기 때문에 항상 성공함.
    res.cookie('loginToken', loginToken, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24) });
    res.status(200).json({ loginToken });
  }
});

export const signin = wrapper(async (req, res) => {
  const loginToken = await AuthServices.signin(req.body);
  if (loginToken === null) {
    res.status(401).json({ err: 'login failed' });
  } else {
    res.cookie('loginToken', loginToken, { expires: new Date(Date.now() + (1000 * 60 * 60 * 24)) });
    res.status(200).json({ loginToken });
  }
});

export const googleOAuthSignUpAndSignIn = wrapper(async (req, res) => {
  try {
    const loginToken = await AuthServices.signinOrSignupViaGoogleOAuth(req.body.idToken);

    res.cookie('loginToken', loginToken, { expires: new Date(Date.now() + (1000 * 60 * 60 * 24)) });
    res.status(200).json({ loginToken });
  } catch (err) {
    res.status(400).json({ err: 'wrong idToken' });
  }
});
