import EventEmitter from 'events';

import io from 'socket.io-client';

const link = 'http://192.168.1.4:5000';
const socket = io(link, {
    transports: ['websocket'],
    jsonp: false,
});

class SocketConnect extends EventEmitter {
    monitoringFrame = user => {
        // socket.connect(() => {
        console.log('hahaha');
        // });
        socket.emit('login', { uname: user }, () => {
            console.log('connected', socket);
        });

        socket.on('pushupdate', data => {
            console.log(data, 'newMonitoringData');
            this.emit('newMonitoringData');
        });

        setInterval(function*() {
            this.emit('test');
        }, 10000);
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
