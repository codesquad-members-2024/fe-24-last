import { Express } from 'express';
import { createServer } from 'http';
import { Server, ServerOptions, Socket } from 'socket.io';

export function setupSocket(app: Express) {
  const server = createServer(app);

  const serverOptions: Partial<ServerOptions> = {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  };

  const io = new Server(server, serverOptions);

  io.on('connection', (socket: Socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('message', (msg: string) => {
      console.log('message: ' + msg);
      io.emit('message', msg);
    });
  });

  return { server, io };
}

export default setupSocket;
