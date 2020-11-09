import { Pc } from '@src/db/models/pc';
import { UsePc } from '@src/db/models/use_pc';
import { PcProvider } from '@src/db/models/pc_provider';
import { UpdatePPBody } from '@src/interfaces/pp';
import { hash } from '@src/utils/crypto';
import { Op } from 'sequelize';

export const updatePP = async (ppId: number, updateBody: UpdatePPBody) => {
  if (updateBody.password) {
    updateBody.password = hash(updateBody.password);
  }
  const pp = await PcProvider.findByPk(ppId);
  if (!pp) {
    return -1;
  }
  return await pp.update(updateBody);
};

export const getPcs = async (ppId: number) => {
  const pcs = await Pc.findAll({
    where: {
      pcProviderId: ppId
    }
  });
  return pcs;
};

export const getUsePcs = async (ppId: number) => {
  const pcs = await getPcs(ppId);
  const uuids = pcs.map(pc => pc.uuid);

  const usePcs = await UsePc.findAll({
    where: {
      pcUuid: {
        [Op.in]: uuids
      }
    }
  });

  return usePcs;
};
