import { EventEmitter } from 'events';

import io from 'socket.io-client';
// import console = require('console');

const loc = window.location;
const wsProtocol =
    loc.protocol === 'https:'
        ? 'https://mohammedwazier.ddns.net'
        : 'http://mohammedwazier.ddns.net';
const link = wsProtocol;
const socket = io(link);

class SocketConnect extends EventEmitter {
    // constructor() {
    //     super();
    // }

    monitoringFrame = user => {
        socket.on(
            'connect',
            () => {
                socket.emit('login', { uname: user }, () => {
                    console.log('connected', socket);
                });

                socket.on('pushupdate', data => {
                    console.log(data, 'newMonitoringData');
                    this.emit('newMonitoringData');
                });
            },
            {
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                reconnectionAttempts: Infinity,
            },
        );
    };

    setScheduling = sendData => {
        socket.emit('appDate', sendData);
    };

    disconnect = () => {
        socket.off();
        socket.disconnect();
    };
}

const socketConnect = new SocketConnect();
export default socketConnect;
