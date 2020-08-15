import { PC } from '@src/db/models/pc';
import { RegisterPCBody } from '@src/interfaces/pc';
import { verifyAuthToken } from './pp_auth';

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
