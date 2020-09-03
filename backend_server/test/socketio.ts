import io from 'socket.io-client';

const socket = io('http://localhost:3000');
socket.on('connect', () => {
  console.log(socket.id);
  socket.emit('signin', {
    uuid: '0fa822bf-d254-4cc3-9bbe-d26cab243c99'
  }, (data: any) => {
    console.log(data);
  });
});

socket.on('allocate', (data: any, ack: any) => {
  console.log(data);
  ack({
    success: true,
    ip: '192.168.0.1',
    ports: [1, 2, 3, 4, 5]
  });
});
