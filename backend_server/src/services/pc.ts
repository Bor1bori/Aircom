import { PC } from '@src/db/models/pc';
import { RegisterPCBody } from '@src/interfaces/pc';
import { verifyAuthToken } from './pp_auth';
import { PCAllocation } from '@src/db/models/pc_allocation';
import { User } from '@src/db/models/user';
import { requestAllocatePC, assureTermination } from './socketio';
import { io } from '@src/bin/www';

/**
 * @returns -1 authToken에 해당하는 ppAuthToken Column이 없을 경우
 * @returns pc 생성된 pc
 */
export async function registerPC (pcBody: RegisterPCBody) {
  const ppAuthToken = await verifyAuthToken(pcBody.authToken);
  if (!ppAuthToken) { // authToken 없을 경우
    return -1;
  }

  return await PC.create({
    ip: pcBody.ip,
    port: pcBody.port,
    pcProviderId: ppAuthToken.pcProviderId,
    state: 'usable' // TODO: default를 unusable로 셋팅하고 상태 관리에서 usable로 바꾸도록 변경
  });
}

/**
 * @description 상태가 usable인 pc를 하나 선택해서 inUse 상태로 바꾼후 반환
 * @returns -1 할당할 수 있는 PC가 없음
 * @returns pc 할당할 PC
 */
export async function selectPCToAllocate () {
  const pc = await PC.findOne({
    where: {
      state: 'usable'
    }
  });

  if (!pc) {
    return -1;
  } else {
    pc.state = 'inUse';
    await pc.save();
    return pc;
  }
}

export async function allocatePC (pc: PC, user: User) {
  try {
    const response = await requestAllocatePC(io, pc.uuid);
    await PCAllocation.create({
      userId: user.id,
      pcUuid: pc.uuid
    });
    return response;
  } catch (err) {
    pc.state = 'unusable';
    await pc.save();
    return null;
  }
}

/**
 * @param user 할당을 해제할 User
 * @returns -1 해당 유저가 할당할 PC를 가지고 있지 않을 때
 * @returns pcAllocation 해제된 할당
 */
export async function deallocatePCWithUser (user: User) {
  const pcAllocation = await PCAllocation.findOne({
    where: {
      userId: user.id,
      endTime: null
    }
  });
  if (!pcAllocation) {
    return -1;
  }
  const pc = await pcAllocation.getPC();
  try {
    const terminateResult = await assureTermination(io, pc.uuid);
    if (!terminateResult.success) {
      return -2; // TODO 발생하면 안됨. 로그 기록, 처리 필요
    }
  } catch (err) {
    return -2; // TODO 발생하면 안됨. 로그 기록, 처리 필요
  }
  pc.state = 'usable'; // TODO: unusable로 설정하고 상태 관리를 통해 usable로 변경하도록 하기
  await pc.save();

  pcAllocation.endTime = new Date();
  await pcAllocation.save();

  // TODO: 시간 차감

  return pcAllocation;
}
