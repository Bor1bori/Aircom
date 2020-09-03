import socketIO from 'socket.io';
import { PC } from '@src/db/models/pc';

const socketIdPCUUIDMappings = new Map<string, string>();
const pcUUIDSocketIdMappings = new Map<string, string>();

interface AllocateReulst {
  success: boolean;
  ip: string;
  ports: number[];
}
// 특정 PC에 할당을 요청해서 ip, ports를 받아옴.
export const requestAllocatePC = (io: socketIO.Server, uuid: string): Promise<AllocateReulst> => {
  return new Promise((resolve, reject) => {
    const socketId = pcUUIDSocketIdMappings.get(uuid);
    if (!socketId) {
      return reject(new Error('unusable pc'));
    }
    io.sockets.connected[socketId].emit('allocate', null, (data: AllocateReulst) => {
      if (!data.success) {
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
      console.log(data.uuid);
      const pc = await PC.findByPk(data.uuid);
      if (!pc || pc.state !== 'unusable') {
        return ack({ success: false });
      }
      socketIdPCUUIDMappings.set(socket.id, data.uuid);
      pcUUIDSocketIdMappings.set(data.uuid, socket.id);
      pc.state = 'usable';
      await pc.save();
      ack({ success: true });
    });

    // TODO: 연결 종료시 처리
  });
};
