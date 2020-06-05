import io from 'socket.io-client';
import { Message } from './model';

export const socket = io('/');

/**
 * Send a message to server through socket
 */
export function sendMessage(message: Message) {
  socket.emit('message', message);
}
