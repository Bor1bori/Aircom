import { wrapper } from '@src/utils/wrapper';
import * as pcServices from '@src/services/pc';

export const allocatePC = wrapper(async (req, res) => {
  let result = null;

  while (!result) {
    const pc = await pcServices.selectPCToAllocate();

    if (pc === -1) {
      return res.status(503).json({
        err: 'there are no pc can be allocated'
      });
    }
    result = await pcServices.allocatePC(pc, req.user!);
  }
  return res.status(200).json({
    ip: result.ip,
    port: result.ports
  });
});

export const deallocatePC = wrapper(async (req, res) => {
  const pcAllocation = await pcServices.deallocatePCWithUser(req.user!);

  if (pcAllocation === -1) {
    return res.status(409).json({
      err: 'no allocation to deallocate'
    });
  } else if (pcAllocation === -2) {
    return res.status(500).json({
      err: 'falied to terminate connection'
    });
  }

  return res.status(200).json({
    usedTime: pcAllocation.endTime!.getTime() - pcAllocation.startTime.getTime()
  });
});
