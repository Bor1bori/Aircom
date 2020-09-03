import { wrapper } from '@src/utils/wrapper';
import * as pcServices from '@src/services/pc';

export const allocatePC = wrapper(async (req, res) => {
  const pc = await pcServices.selectPCToAllocate();

  if (pc === -1) {
    return res.status(503).json({
      err: 'there are no pc can be allocated'
    });
  }

  // PC 할당
  const result = await pcServices.allocatePC(pc, req.user!);

  if (!result) {
    // TODO: 처리
  }
  return res.status(200).json({
    ip: result!.ip,
    port: result!.ports
  });
});

export const deallocatePC = wrapper(async (req, res) => {
  const pcAllocation = await pcServices.deallocatePCWithUser(req.user!);

  if (pcAllocation === -1) {
    return res.status(409).json({
      err: 'no allocation to deallocate'
    });
  }

  return res.status(200).json({
    usedTime: pcAllocation.endTime!.getTime() - pcAllocation.startTime.getTime()
  });
});
