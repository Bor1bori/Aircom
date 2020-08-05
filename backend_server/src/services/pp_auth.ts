import { PCProvider } from '@src/db/models/pc_provider';
import { SignupBody, SigninBody } from '@src/interfaces/pp_auth';
import { jwtSign, hash, getRandomAlphNum } from '@src/utils/crypto';
import { getUserIdFromIDToken } from './googleoauth';

export async function signup (ppUser: SignupBody) {
  const foundPPUser = await PCProvider.findOne({ where: { email: ppUser.email } });
  if (foundPPUser !== null) {
    return null;
  } else {
    return await PCProvider.create({
      ...ppUser,
      password: hash(ppUser.password), // password는 암호화해서 저장
      signinType: 'email'
    });
  }
}

export async function signin (ppUser: SigninBody) {
  const foundPPUser = await PCProvider.findOne({
    where: {
      signinType: 'email',
      ...ppUser,
      password: hash(ppUser.password) // password는 암호화해서 저장
    }
  });
  if (foundPPUser === null) {
    return null;
  } else {
    return jwtSign({ id: foundPPUser.id }, 1000 * 60 * 60 * 24);
  }
}

export async function signinOrSignupViaGoogleOAuth (idToken: string) {
  const ppUserID = await getUserIdFromIDToken(idToken);

  const foundPPUser = await PCProvider.findOne({
    where: {
      signinType: 'googleoauth',
      signinID: ppUserID
    }
  });

  let signedinID;
  if (foundPPUser !== null) { // 가입된 유저일 경우
    signedinID = foundPPUser.id;
  } else {
    const newUser = await PCProvider.create({
      signinType: 'googleoauth',
      signinID: ppUserID
    });
    signedinID = newUser.id;
  }

  return jwtSign({ id: signedinID }, 1000 * 60 * 60 * 24);
}

const authCodeMap: any = {

};

export const getAuthCode = (ppId: number) => {
  let authCode = getRandomAlphNum(6).toUpperCase();

  while (authCodeMap[authCode]) {
    authCode = getRandomAlphNum(6);
  }

  authCodeMap[authCode] = ppId;
  setTimeout(() => delete authCodeMap[authCode], 1000 * 60 * 5 /* 5분간 유효 */);

  return authCode;
};

export const verifyAuthCode = (authCode: string) => {
  const ppId = authCodeMap[authCode].toUpperCase();
  if (ppId) {
    return ppId;
  } else {
    return null;
  }
};
