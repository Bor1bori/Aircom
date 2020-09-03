import socketIO from 'socket.io';

export const socketEventsInject = (io: socketIO.Server) => {
  io.on('connection', (socket) => {
    console.log('connection on');
    socket.on('signin', () => {
    });
  });
};
