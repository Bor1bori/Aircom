import { PCProvider } from '@src/db/models/pc_provider';
import { UpdatePPBody } from '@src/interfaces/pp';
import { hash } from '@src/utils/crypto';

export const updatePP = async (ppId: number, updateBody: UpdatePPBody) => {
  if (updateBody.password) {
    updateBody.password = hash(updateBody.password);
  }
  const pp = await PCProvider.findByPk(ppId);
  if (!pp) {
    return -1;
  }
  return await pp.update(updateBody);
};
