import { wrapper } from '@src/utils/wrapper';
import * as pcServices from '@src/services/pc';

export const usePc = wrapper(async (req, res) => {
  let result = null;

  while (!result) {
    const pc = await pcServices.selectPcToUse();

    if (pc === -1) {
      return res.status(503).json({
        err: 'there are no pc can be allocated'
      });
    }
    result = await pcServices.usePc(pc, req.user!);
  }
  return res.status(200).json({
    ip: result.ip,
    port: result.ports
  });
});

export const endUse = wrapper(async (req, res) => {
  const endResult = await pcServices.endUseWithUser(req.user!);

  if (endResult === -1) {
    return res.status(409).json({
      err: 'no use to end'
    });
  } else if (endResult === -2) {
    return res.status(500).json({
      err: 'falied to terminate connection'
    });
  }

  return res.status(200).json({
    usedTime: endResult.endTime!.getTime() - endResult.startTime.getTime()
  });
});
