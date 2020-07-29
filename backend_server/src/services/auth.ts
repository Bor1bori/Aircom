import { User } from '@src/db/models/users';
import { SignupBody, SigninBody } from '@src/interfaces/auth';
import { jwtSign } from '@src/utils/crypto';

export async function signup(user: SignupBody) {
  const foundUser = await User.findOne({where: {email: user.email}});
  if (foundUser !== null) {
    return null;
  } else {
    console.log(1);
    return await User.create({
      ...user,
      signinType: 'email'
    });
  }
}

export async function signin(user: SigninBody) {
  const foundUser = await User.findOne({
    where: {
      signinType: 'email',
      ...user
    }
  });
  if (foundUser === null) {
    return null;
  } else {
    return jwtSign({id:foundUser.id}, 1000 * 60 * 60 * 24);
  }
}