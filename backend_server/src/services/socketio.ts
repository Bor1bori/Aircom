import socketIO from 'socket.io';
import { PC } from '@src/db/models/pc';

const socketIdPCUuidMappings = new Map<string, string>();
const pcUuidSocketIdMappings = new Map<string, string>();

interface AllocateResult {
  success: boolean;
  ip: string;
  ports: number[];
}

interface AskStateResult {
  state: 'inUse' | 'usable';
}

interface TerminateResult {
  success: boolean;
}

/**
 * @description 특정 PC에 할당을 요청해서 ip, ports를 받아옴.
 * @param io socketIO Server
 * @param uuid 할당할 PC의 uuid
 * @returns Promise\<data\>
 * @data ip ip
 * @data ports 연결할 포트 배열
 * @throws 'unusable pc' 현재 소켓 연결이 되지 않았거나 이용이 불가능할 경우
 */
export const requestAllocatePC = (io: socketIO.Server, uuid: string): Promise<AllocateResult> => {
  return new Promise((resolve, reject) => {
    const socketId = pcUuidSocketIdMappings.get(uuid);
    if (!socketId) {
      return reject(new Error('unusable pc'));
    }
    io.sockets.connected[socketId].emit('allocate', null, (data: AllocateResult) => {
      if (!data.success) {
        return reject(new Error('unusable pc'));
      }
      return resolve(data);
    });
  });
};

// 특정 PC에 state를 물어봄
export const askStateToPC = (io: socketIO.Server, uuid: string): Promise<AskStateResult> => {
  return new Promise((resolve, reject) => {
    const socketId = pcUuidSocketIdMappings.get(uuid);
    if (!socketId) {
      return reject(new Error('unusable pc'));
    }
    io.sockets.connected[socketId].emit('ask_state', null, (data: AskStateResult) => {
      return resolve(data);
    });
  });
};

export const assureTermination = (io: socketIO.Server, uuid: string): Promise<TerminateResult> => {
  return new Promise((resolve, reject) => {
    const socketId = pcUuidSocketIdMappings.get(uuid);
    if (!socketId) {
      return reject(new Error('unusable pc'));
    }
    io.sockets.connected[socketId].emit('assure_termination', null, (data: TerminateResult) => {
      if (!data.success) {
        // TODO 발생하면 안됨. 로그 기록, 처리 필요
        return reject(new Error('unusable pc'));
      }
      return resolve(data);
    });
  });
};

export const socketEventsInject = (io: socketIO.Server) => {
  io.on('connection', (socket) => {
    console.log('connection on');
    socket.on('signin', async (data: any, ack) => {
      console.log(data.uuid + ' signed in');
      const pc = await PC.findByPk(data.uuid);
      if (!pc || pc.state !== 'unusable') {
        return ack({ success: false });
      }
      socketIdPCUuidMappings.set(socket.id, data.uuid);
      pcUuidSocketIdMappings.set(data.uuid, socket.id);
      pc.state = 'usable';
      await pc.save();
      ack({ success: true });
    });

    socket.on('disconnect', async (reason) => {
      console.log('disconnected ' + reason);
      const uuid = socketIdPCUuidMappings.get(socket.id);
      if (uuid) {
        socketIdPCUuidMappings.delete(socket.id);
        pcUuidSocketIdMappings.delete(uuid);
        await PC.update({
          state: 'unusable'
        }, {
          where: {
            uuid
          }
        });
      }
    });
  });
};
