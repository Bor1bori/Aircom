import { User } from '@src/db/models/user';
import { UpdateUserBody } from '@src/interfaces/user';
import { hash } from '@src/utils/crypto';

export const updateUser = async (userId: number, updateBody: UpdateUserBody) => {
  if (updateBody.password) {
    updateBody.password = hash(updateBody.password);
  }
  const user = await User.findByPk(userId);
  if (!user) {
    return -1;
  }
  return await user.update(updateBody);
};
