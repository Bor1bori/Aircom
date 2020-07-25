import { User, UserAttributes } from '@src/db/models/users';
import { jwtSign } from '@src/utils/crypto';

// TODO: Interface 따로 빼두기
interface IUserSignin {
  email: string;
  password: string;
}

export async function signup(user: UserAttributes) {
  const foundUser = await User.findOne({where: {email: user.email}});
  if (foundUser !== null) {
    return null;
  } else {
    console.log(1);
    return await User.create(user);
  }
}

export async function signin(user: IUserSignin) {
  const foundUser = await User.findOne({
    where: user
  });
  if (foundUser === null) {
    return null;
  } else {
    return jwtSign({id:foundUser.id}, 1000 * 60 * 60 * 24);
  }
}