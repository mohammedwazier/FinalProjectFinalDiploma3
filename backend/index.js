const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const fs = require('fs');
const http = require('http');
const app = express();
const path = require('path');

// var cors = require('cors');

const mongo = require(__dirname + '/mongo');
const bodyParser = require('body-parser');
// const hehehe = require(__dirname + 'process');
// const sendMongo = new hehehe();

const port =  5000;

// app.use(cors());

// var whitelist = ['*'];
// var corsOptions = {
//     origin: function(origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
// };

// // Then pass them to cors:
// app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, '/../web/frontend/build/')));
// app.use(express.favicon(__dirname + '/public/favicon.ico', { maxAge: 2592000000 }));

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

// app.use(morgan('tiny'));
app.use(
    morgan('common', {
        stream: fs.createWriteStream('./access.log', { flags: 'a' }),
    }),
);
app.use(morgan('dev'));

app.use(
    bodyParser.json({
        limit: '10000kb',
    }),
);
app.disable('x-powered-by');

app.use('/api', require(path.join(__dirname, '/api/api')));
app.use(
    '/apiMicro',
    require(path.join(__dirname, '/apiMicrocontroller/apiMicrocontroller')),
);

let httpServer = http.createServer(app);

let server = httpServer.listen(port, () => {
    console.log(`Server is running on => http://localhost:${port}`);
});

// Socket IO Interface
mongo.then(function(client) {
    const io = require('socket.io')(server);
    const db = client.db('finalProject');
    
    // console.log(client);

    io.sockets.on('connection', socket => {
        console.log('new Clients', socket.id);

        socket.on('toggle', data => {
            console.log(data, socket.id);
        });

        socket.on('login', data => {
            //Make User Join Room itself
            socket.join('realTime_' + data.uname);
            console.log(
                'Socket : ' +
                    socket.id +
                    ' Joined Room: realTime_' +
                    data.uname,
            );
        });

        socket.on('appDate', date => {
            console.log('coming data', date);
            const stringData =
                date.startDate+'_'+date.endDate+' '+date.startHour+"_"+date.endHour+"_"+~~date.setDate+"_"+~~date.setHour+"_"+date.statusMonitoring;
            //Send emit to nodeMCU
            socket.broadcast.emit('dateNode', stringData);
        });

        socket.on('getStatusDate', username => {
            console.log(username);
            db.collection('status_monitoring').findOne({ 'username': username.uname }, function(
                err,
                respCheck,
            ) {
                if (!respCheck) {
                    console.log(false);
                } else {
                    console.log(respCheck);
                    var startDate = respCheck.startDate === null ? null : respCheck.startDate.substring(0,10);
                    var endDate = respCheck.endDate === null ? null : respCheck.endDate.substring(0,10);
                    const dataRes = startDate+"_"+endDate+" "+respCheck.startHour+"_"+respCheck.endHour+"_"+~~respCheck.setDate+"_"+~~respCheck.setHour+"_"+respCheck.statusMonitoring;
                    socket.emit('dateNode', dataRes);
                }
            });
        })

        //broadcast message to room itself
        socket.on('send', function(data) {
            console.log(
                socket.id +
                    ' Push new Message to All Broadcast Room, ' +
                    data.username,
            );
            io.sockets
                .in('realTime_' + data.username)
                .emit('pushupdate', { msg: 'newData', from: socket.id });
        });

        socket.on('disconnect', function() {
            console.log('client disconnect', socket.id);
        });
    });
});

// End Socket IO Interface
