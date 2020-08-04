import { wrapper } from '@src/utils/wrapper';
import * as PPAuthServices from '@src/services/pp_auth';

export const signup = wrapper(async (req, res) => {
  const user = await PPAuthServices.signup(req.body);

  if (user === null) {
    // 중복된 이메일
    res.status(409).json({ err: 'duplicated email' });
  } else {
    const ppLoginToken = await PPAuthServices.signin(req.body);
    // 방금 만든 계정으로 로그인하기 때문에 항상 성공함.
    res.cookie('ppLoginToken', ppLoginToken, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24) });
    res.status(200).json({ ppLoginToken });
  }
});

export const signin = wrapper(async (req, res) => {
  const ppLoginToken = await PPAuthServices.signin(req.body);
  if (ppLoginToken === null) {
    res.status(401).json({ err: 'login failed' });
  } else {
    res.cookie('ppLoginToken', ppLoginToken, { expires: new Date(Date.now() + (1000 * 60 * 60 * 24)) });
    res.status(200).json({ ppLoginToken });
  }
});

export const googleOAuthSignUpAndSignIn = wrapper(async (req, res) => {
  try {
    const ppLoginToken = await PPAuthServices.signinOrSignupViaGoogleOAuth(req.body.idToken);

    res.cookie('ppLoginToken', ppLoginToken, { expires: new Date(Date.now() + (1000 * 60 * 60 * 24)) });
    res.status(200).json({ ppLoginToken });
  } catch (err) {
    res.status(400).json({ err: 'wrong idToken' });
  }
});
