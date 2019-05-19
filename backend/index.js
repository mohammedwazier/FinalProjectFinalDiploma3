const express = require('express');
const router = express.Router();
const http = require('http');
const app = express();
const path = require('path');

const mongo = require(__dirname + '/mongo');
// const bodyParser = require("body-parser");

const port = process.env.PORT || 5000;

let list_user = 0;

var clients = [];

app.use(express.static(path.join(__dirname, '/../web/frontend/build/')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../web/frontend/build/index.html'));
});

// import passport and passport-jwt modules
const passport = require('passport');
const passportJWT = require('passport-jwt');

// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;

// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'mohammedwazier';

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let user = getUser({ id: jwt_payload.id });
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});
// use the strategy
passport.use(strategy);

app.use(passport.initialize());

app.use('/api', require(path.join(__dirname, '/api/api')));
app.use('/apiMicro', require(path.join(__dirname, '/apiMicrocontroller/apiMicrocontroller')));

let httpServer = http.createServer(app);
let server = httpServer.listen(port, () => {
    console.log('Server is running on Port http://localhost:' + port);
});

// Socket IO Interface
mongo.then(function(client) {
    const io = require('socket.io')(server);
    const db = client.db('finalProject');

    io.sockets.on('connection', socket => {
        // list_user++;
        // console.log('new user connected, List User :  ' + list_user);
        // console.log('Clients : ', clients, '\n');

        socket.on('toggle', data => {
            console.log(data, socket.id);
        });

        socket.on('login', data => {
            // const logUser = {};
            // const count = clients.length;
            // logUser.id = count + 1;
            // logUser.username = data.uname;
            // logUser.token = data.token;
            // logUser.socket = socket.id;

            // if (count > 0) {
            //     var findData = false;
            //     clients.map(data => {
            //         if (data.token === logUser.token) {
            //             findData = true;
            //             console.log(findData, data.token);
            //             data.socket = logUser.socket;
            //         }
            //     });
            //     if (!findData) {
            //         clients.push(logUser);
            //     }
            // } else {
            //     clients.push(logUser);
            // }
            //Make User Join Room itself
            socket.join('realTime_' + data.uname);
            console.log(
                'Socket : ' +
                    socket.id +
                    ' Joined Room: realTime_' +
                    data.uname +
                    '\n',
            );
            // console.log('Clients : ', clients, '\n');
        });

        //broadcast message to room itself
        socket.on('send', function(data) {
            console.log(socket.id + ' Push new Message to All Broadcast Room');
            io.sockets
                .in('realTime_' + data.username)
                .emit('pushUpdate', { msg: 'newData', from: socket.id });
            // socket.broadcast.emit('data_rec', { msg: 'hellowww' });
        });
        socket.on('disconnect', function() {
            const count = clients.length;
        });
    });
});

// End Socket IO Interface
