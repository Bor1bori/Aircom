/* eslint-disable @typescript-eslint/no-unused-vars */
import socketIO from 'socket.io';
import { Pc } from '@src/db/models/pc';

const socketIdPcUuidMappings = new Map<string, string>();
const pcUuidSocketIdMappings = new Map<string, string>();

interface AskStateResult {
  state: 'inUse' | 'usable';
}

interface TerminateResult {
  success: boolean;
}

/**
 * @description 특정 Pc에 할당을 요청해서 ip, ports를 받아옴.
 * @param io socketIO Server
 * @param uuid 할당할 Pc의 uuid
 * @returns promise -1 fail
 * @returns promise 1 success
 */
export const testPcUsable = (io: socketIO.Server, uuid: string): Promise<-1 | 1> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, reject) => {
    const socketId = pcUuidSocketIdMappings.get(uuid);
    if (!socketId) {
      return resolve(-1);
    }
    return resolve(1);
  });
};

// 특정 Pc에 state를 물어봄
export const askStateToPc = (io: socketIO.Server, uuid: string): Promise<AskStateResult | -1> => {
  return new Promise((resolve, reject) => {
    const socketId = pcUuidSocketIdMappings.get(uuid);
    if (!socketId) {
      return resolve(-1);
    }
    io.sockets.connected[socketId].emit('ask_state', null, (data: AskStateResult) => {
      return resolve(data);
    });
  });
};

export const assureTermination = (io: socketIO.Server, uuid: string): Promise<TerminateResult | -1> => {
  return new Promise((resolve, reject) => {
    const socketId = pcUuidSocketIdMappings.get(uuid);
    if (!socketId) {
      return resolve(-1);
    }
    io.sockets.connected[socketId].emit('assure_termination', null, (data: TerminateResult) => {
      if (!data.success) {
        return resolve(-1);
        // TODO 발생하면 안됨. 로그 기록, 처리 필요
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
      const pc = await Pc.findByPk(data.uuid);
      if (!pc || pc.state !== 'unusable') {
        return ack({ success: false });
      }
      socketIdPcUuidMappings.set(socket.id, data.uuid);
      pcUuidSocketIdMappings.set(data.uuid, socket.id);
      pc.state = 'usable';
      await pc.save();
      ack({ success: true });
    });

    socket.on('disconnect', async (reason) => {
      console.log('disconnected ' + reason);
      const uuid = socketIdPcUuidMappings.get(socket.id);
      if (uuid) {
        socketIdPcUuidMappings.delete(socket.id);
        pcUuidSocketIdMappings.delete(uuid);
        await Pc.update({
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
