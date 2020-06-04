import io from 'socket.io-client';
import { Message } from './model';
export const socket = io('/');

export function sendMessage(message: Message) {
  socket.emit('message', message);
}
