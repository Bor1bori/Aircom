import { Pc } from '@src/db/models/pc';
import { RegisterPcBody } from '@src/interfaces/pc';
import { verifyAuthToken } from './pp_auth';
import { UsePc } from '@src/db/models/use_pc';
import { User } from '@src/db/models/user';
import { testPcUsable, assureTermination } from './socketio';
import { io } from '@src/bin/www';

/**
 * @returns -1 authToken에 해당하는 ppAuthToken Column이 없을 경우
 * @returns pc 생성된 pc
 */
export async function registerPc (pcBody: RegisterPcBody) {
  const ppAuthToken = await verifyAuthToken(pcBody.authToken);
  if (!ppAuthToken) { // authToken 없을 경우
    return -1;
  }

  return await Pc.create({
    ip: pcBody.ip,
    port1: pcBody.port1,
    port2: pcBody.port2,
    port3: pcBody.port3,
    port4: pcBody.port4,
    port5: pcBody.port5,
    port6: pcBody.port6,
    port7: pcBody.port7,
    pcProviderId: ppAuthToken.pcProviderId,
    state: 'usable' // TODO: default를 unusable로 셋팅하고 상태 관리에서 usable로 바꾸도록 변경
  });
}

/**
 * @description 상태가 usable인 pc를 하나 선택해서 inUse 상태로 바꾼후 반환
 * @returns -1 할당할 수 있는 Pc가 없음
 * @returns pc 할당할 Pc
 */
export async function selectPcToUse () {
  const pc = await Pc.findOne({
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

export async function usePc (pc: Pc, user: User) {
  const response = await testPcUsable(io, pc.uuid);
  if (response === -1) {
    pc.state = 'unusable';
    await pc.save();
    return null;
  }
  await UsePc.create({
    userId: user.id,
    pcUuid: pc.uuid
  });
  return {
    ip: pc.ip,
    ports: [pc.port1, pc.port2, pc.port3, pc.port4, pc.port5, pc.port6, pc.port7]
  };
}

/**
 * @param user 할당을 해제할 User
 * @returns -1 해당 유저가 할당할 Pc를 가지고 있지 않을 때
 * @returns usePc 해제된 할당
 */
export async function endUseWithUser (user: User) {
  const usePc = await UsePc.findOne({
    where: {
      userId: user.id,
      endTime: null
    }
  });
  if (!usePc) {
    return -1;
  }
  const pc = await usePc.getPc();
  const terminateResult = await assureTermination(io, pc.uuid);
  if (terminateResult === -1) {
    return -2; // TODO 발생하면 안됨. 로그 기록, 처리 필요
  }
  pc.state = 'unusable';
  await pc.save();

  usePc.endTime = new Date();
  await usePc.save();

  user.remainTime = user.remainTime - (usePc.endTime.getTime() - usePc.startTime.getTime());
  await user.save();

  return usePc;
}
