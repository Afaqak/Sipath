import io from 'socket.io-client';

const URL = process.env.BACKEND_URL || 'http://backend.sipath.com';

export const socket = io(URL, { transports: ['websocket', 'polling', 'flashsocket'] });
